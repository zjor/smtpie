import { Test, TestingModule } from '@nestjs/testing';
import { QuotaService } from './quota.service';

describe('QuotaService', () => {
  let service: QuotaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotaService],
    }).compile();

    service = module.get<QuotaService>(QuotaService);
    service.addTenant('alice', 2);
  });

  it('should allow 2 requests', () => {
    expect(service.checkQuota('alice', 1)).toBeTruthy();
    expect(service.checkQuota('alice', 2)).toBeTruthy();
    expect(service.checkQuota('alice', 3)).toBeFalsy();
  });

  it('should allow 2 requests per hour', () => {
    expect(service.checkQuota('alice', 1)).toBeTruthy();
    expect(service.checkQuota('alice', 2)).toBeTruthy();
    expect(service.checkQuota('alice', 2 + 3600)).toBeTruthy();
  });
});
