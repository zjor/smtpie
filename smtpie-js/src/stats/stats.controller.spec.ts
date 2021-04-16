import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { TemplateService } from '../template-service/template.service';
import { EventLogService } from '../event-log/event-log.service';
import { EventLogRepository } from '../event-log/event-log.repository';

const mockEventLogRepository = () => ({});

describe('StatsController', () => {
  let controller: StatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        EventLogService,
        TemplateService,
        { provide: EventLogRepository, useFactory: mockEventLogRepository },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should return index', () => {
    expect(controller.index()).toBeTruthy();
  });
});
