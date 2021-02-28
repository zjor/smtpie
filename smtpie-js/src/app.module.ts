import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { TemplateService } from './template-service/template.service';
import { ConfigService } from './config/config.service';
import { MonitoringController } from './monitoring/monitoring.controller';
import { StatsController } from './stats/stats.controller';
import { StatsService } from './stats/stats.service';

@Module({
  imports: [],
  controllers: [ApiController, MonitoringController, StatsController],
  providers: [TemplateService, ConfigService, StatsService],
})
export class AppModule {}
