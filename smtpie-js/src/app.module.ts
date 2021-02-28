import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { TemplateService } from './template-service/template.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [TemplateService, ConfigService],
})
export class AppModule {}
