import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

import * as path from 'path';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', async () => {
    const filename = path.join(__dirname, 'test.config.yaml');
    await service.load(filename);
    expect(service).toBeDefined();
  });
});
