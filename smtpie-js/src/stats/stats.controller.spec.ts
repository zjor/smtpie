import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TemplateService } from '../template-service/template.service';

describe('StatsController', () => {
  let controller: StatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [StatsService, TemplateService],
    }).compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should return index', () => {
    expect(controller.index()).toBeTruthy();
  });
});
