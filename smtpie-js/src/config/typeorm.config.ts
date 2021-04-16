import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'smtpie',
  password: process.env.DB_PASS || 's3cr3t',
  database: process.env.DB_NAME || 'smtpie',
  autoLoadEntities: true,
  synchronize: true,
};
