import { Controller, Get } from '@nestjs/common';
import { StatsService } from '../stats/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  index(): any {
    return this.statsService.storage;
  }
}
