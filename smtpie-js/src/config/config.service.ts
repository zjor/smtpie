import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as yaml from 'yaml';
import { QuotaService } from '../quota/quota.service';

export interface Connection {
  host: string;
  port: number;
  ssl: boolean;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Limits {
  maxRecipients: number;
  maxHourly: number;
}

export interface Tenant {
  name: string;
  appId: string;
  secret: string;
  connection: Connection;
  credentials: Credentials;
  limits?: Limits;
}

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);

  private readonly tenantsCache: Map<string, Tenant> = new Map();

  constructor(private readonly quoteService: QuotaService) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Initializing ConfigService');
    await this.load(process.env.TENANTS_CONFIG_FILE);
  }

  parse(content: string): Array<Tenant> {
    const tenants: Array<Tenant> = [];
    yaml.parse(content).tenants.forEach((tenant) => {
      tenants.push(tenant as Tenant);
      this.logger.log(`Loaded tenant: ${JSON.stringify(tenant)}`);
    });
    return tenants;
  }

  async load(filename: string) {
    const readFile = util.promisify(fs.readFile);

    const fullPath = filename.startsWith('/')
      ? filename
      : path.join(process.cwd(), filename);

    this.logger.log(`Loading config from: ${fullPath}`);

    const data = await readFile(fullPath, { encoding: 'utf-8' });
    const tenants = this.parse(data);
    tenants.forEach((t: Tenant) => {
      this.tenantsCache.set(t.appId, t);
      this.quoteService.addTenant(t.appId, t.limits.maxHourly);
    });
  }

  getTenant(appId: string): Tenant | undefined {
    if (this.tenantsCache.has(appId)) {
      return this.tenantsCache.get(appId);
    } else {
      return undefined;
    }
  }
}
