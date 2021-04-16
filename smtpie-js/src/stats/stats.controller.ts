import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../stats/stats.service';
import { TemplateService } from '../template-service/template.service';

@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly templateService: TemplateService,
  ) {}

  @Get()
  index(): any {
    return Object.fromEntries(this.statsService.storage);
  }

  @Get('invalidate-cache')
  invalidateCache(): any {
    this.templateService.invalidate();
  }
}
