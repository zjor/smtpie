import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { TemplateService } from '../template-service/template.service';
import { ConfigService } from '../config/config.service';
import { QuotaService } from '../quota/quota.service';
import { EventLogRepository } from '../event-log/event-log.repository';

const mockEventLogRepository = () => ({});

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        TemplateService,
        ConfigService,
        QuotaService,
        { provide: EventLogRepository, useFactory: mockEventLogRepository },
      ],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
