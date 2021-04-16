import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event-log')
export class EventLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  timestamp: number;

  @Column()
  tenant: string;

  @Column({ length: 4096 })
  request: string;

  @Column()
  status: boolean;

  @Column({ nullable: true, length: 4096 })
  error?: string;
}
