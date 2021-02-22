import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { TemplateService } from './template-service/template.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, TemplateService, ConfigService],
})
export class AppModule {}
