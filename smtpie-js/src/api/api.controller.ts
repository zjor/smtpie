import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { StatsService } from '../stats/stats.service';
import { TemplateService } from '../template-service/template.service';
import { ConfigService, Tenant } from '../config/config.service';
import Mail from 'nodemailer/lib/mailer';
import { QuotaService } from '../quota/quota.service';
import { SendMailRequest } from './dto/send-mail-request.dto';
import { EventLogRepository } from '../event-log/event-log.repository';

@Controller('api/v1/mail')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(
    private readonly statsService: StatsService,
    private readonly templateService: TemplateService,
    private readonly configService: ConfigService,
    private readonly quotaService: QuotaService,
    private readonly eventLogRepository: EventLogRepository,
  ) {}

  @Post('send')
  async send(
    @Headers('x-app-id') appId: string,
    @Headers('x-secret') secret: string,
    @Body() req: SendMailRequest,
  ) {
    const tenant: Tenant = this.configService.getTenant(appId);
    if (tenant === undefined) {
      throw new HttpException(
        `Tenant: ${appId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (tenant.secret !== secret) {
      this.statsService.incFailure(tenant.name);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (tenant.limits.maxRecipients < req.to.length) {
      this.statsService.incFailure(tenant.name);
      throw new HttpException('Too many recipients', HttpStatus.BAD_REQUEST);
    }

    const now = new Date().getTime() / 1000;
    if (!this.quotaService.checkQuota(tenant.appId, now)) {
      this.statsService.incFailure(tenant.name);
      throw new HttpException(
        'Too many requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    try {
      const message = await this.renderTemplate(req);
      this.logger.debug(`Message: ${message}`);

      const res = await this.getMailer(tenant).sendMail({
        from: req.from,
        to: req.to.concat(','),
        subject: req.subject,
        html: message,
      });

      await this.eventLogRepository.createEventLog(
        tenant.name,
        JSON.stringify(req),
      );

      this.statsService.incSuccess(tenant.name);

      return {
        success: true,
        data: res,
      };
    } catch (e) {
      this.statsService.incFailure(tenant.name);
      await this.eventLogRepository.createEventLog(
        tenant.name,
        JSON.stringify(req),
        JSON.stringify(e),
      );
      throw e;
    }
  }

  async renderTemplate(req: SendMailRequest): Promise<string> {
    const template =
      req.template || (await this.templateService.resolve(req.templateUrl));
    return this.templateService.render(template, req.params);
  }

  getMailer(tenant: Tenant): Mail {
    return nodemailer.createTransport({
      host: tenant.connection.host,
      port: tenant.connection.port,
      secure: tenant.connection.ssl,
      auth: {
        user: tenant.credentials.username,
        pass: tenant.credentials.password,
      },
    });
  }
}
