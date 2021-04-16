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
}
