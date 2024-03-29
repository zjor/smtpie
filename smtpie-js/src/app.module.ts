import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { TemplateService } from './template-service/template.service';
import { ConfigService } from './config/config.service';
import { MonitoringController } from './monitoring/monitoring.controller';
import { StatsController } from './stats/stats.controller';
import { QuotaService } from './quota/quota.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EventLogRepository } from './event-log/event-log.repository';
import { EventLogService } from './event-log/event-log.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([EventLogRepository]),
  ],
  controllers: [ApiController, MonitoringController, StatsController],
  providers: [TemplateService, ConfigService, QuotaService, EventLogService],
})
export class AppModule {}
