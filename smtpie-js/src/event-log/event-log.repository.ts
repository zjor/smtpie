import { EntityRepository, Repository } from 'typeorm';
import { EventLog } from './event-log.entity';

@EntityRepository(EventLog)
export class EventLogRepository extends Repository<EventLog> {
  async createEventLog(
    tenant: string,
    request: string,
    error?: string,
  ): Promise<EventLog> {
    const obj = this.create();
    obj.timestamp = new Date().getTime();
    obj.tenant = tenant;
    obj.request = request;
    obj.status = error ? false : true;
    obj.error = error;
    await obj.save();

    return obj;
  }

  async getTenants(): Promise<any> {
    const result = await this.query('SELECT distinct tenant FROM event_log');
    return result.map((v) => v['tenant']);
  }

  async countByTenantAndStatus(
    tenant: string,
    status: boolean,
  ): Promise<number> {
    const query = this.createQueryBuilder('event_log');
    query
      .where('tenant = :tenant', { tenant })
      .andWhere('status = :status', { status });
    return await query.getCount();
  }
}
