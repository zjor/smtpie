import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { TemplateService } from './template-service/template.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, TemplateService],
})
export class AppModule {}
