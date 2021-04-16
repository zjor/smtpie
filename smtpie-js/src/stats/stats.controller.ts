import { Controller, Get } from '@nestjs/common';
import { TemplateService } from '../template-service/template.service';
import { EventLogService } from '../event-log/event-log.service';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly eventLogService: EventLogService,
  ) {}

  @Get()
  async index(): Promise<any> {
    return this.eventLogService.getStats();
  }

  @Get('invalidate-cache')
  invalidateCache(): any {
    this.templateService.invalidate();
  }
}
