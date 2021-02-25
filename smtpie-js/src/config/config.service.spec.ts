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

  it('should load config and get tenant', async () => {
    const filename = path.join(__dirname, 'test.config.yaml');
    await service.load(filename);
    const tenant = service.getTenant('alice-id');
    expect(tenant.name).toEqual('alice');
  });
});
