import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'smtpie',
  password: 's3cr3t',
  database: 'smtpie',
  autoLoadEntities: true,
  synchronize: true,
};
