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
import { TemplateService } from '../template-service/template.service';
import { ConfigService, Tenant } from '../config/config.service';
import Mail from 'nodemailer/lib/mailer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMailRequest {
  @ApiProperty()
  from: string;

  @ApiProperty()
  to: Array<string>;

  @ApiProperty()
  params?: any;

  @ApiProperty()
  subject: string;

  @ApiPropertyOptional()
  template?: string;

  @ApiPropertyOptional()
  templateUrl?: string;
}

@Controller('api/v1/mail')
export class ApiController {
  private readonly logger = new Logger(ApiController.name);

  constructor(
    private readonly templateService: TemplateService,
    private readonly configService: ConfigService,
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
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const message = await this.renderTemplate(req);
    this.logger.debug(`Message: ${message}`);

    const res = await this.getMailer(tenant).sendMail({
      from: req.from,
      to: req.to.concat(','),
      subject: req.subject,
      html: message,
    });
    return {
      success: true,
      data: res,
    };
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
