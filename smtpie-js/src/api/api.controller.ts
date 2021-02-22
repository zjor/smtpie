import { Body, Controller, Post } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppService } from "../app.service";
import { TemplateService } from "../template-service/template.service";

interface SendMailRequest {
  from: string;
  to: Array<string>;
  params?: any;
  subject: string;
  template?: string;
  templateUrl?: string;
}

@Controller('api/v1/mail')
export class ApiController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('send')
  async send(@Body() req: SendMailRequest) {
    const t = this.templateService.render('Hello, {{name}}', { name: 'Alice' });
    console.log(t);
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp-pulse.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'EMAIL',
    //     pass: 'PASS',
    //   },
    // });
    // const res = await transporter.sendMail({
    //   from: req.from,
    //   to: req.to.concat(','),
    //   subject: req.subject,
    //   html: req.templateUrl,
    // });
    return {
      success: true,
    };
  }
}
