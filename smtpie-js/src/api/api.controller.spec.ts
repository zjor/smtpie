import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { StatsService } from '../stats/stats.service';
import { TemplateService } from '../template-service/template.service';
import { ConfigService } from '../config/config.service';
import { QuotaService } from '../quota/quota.service';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [StatsService, TemplateService, ConfigService, QuotaService],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
