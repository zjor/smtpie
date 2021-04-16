import { Injectable, Logger } from '@nestjs/common';
import { EventLogRepository } from './event-log.repository';

@Injectable()
export class EventLogService {
  private readonly logger = new Logger(EventLogService.name);

  constructor(private readonly eventLogRepository: EventLogRepository) {}

  async getStats(): Promise<any> {
    const tenants = await this.eventLogRepository.getTenants();
    this.logger.log(`Tenants: ${JSON.stringify(tenants)}`);
    const stats = {};

    for (const t of tenants) {
      stats[t] = {
        success: await this.eventLogRepository.countByTenantAndStatus(t, true),
        failure: await this.eventLogRepository.countByTenantAndStatus(t, false),
      };
    }
    return stats;
  }
}
