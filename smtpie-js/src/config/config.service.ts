import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as yaml from 'yaml';

interface Tenant {
  name: string;
  appId: string;
}

@Injectable()
export class ConfigService {
  parse(content: string): Array<Tenant> {
    const tenants: Array<Tenant> = [];
    yaml.parse(content).tenants.forEach((tenant) => {
      tenants.push(tenant as Tenant);
    });
    return tenants;
  }

  async load(filename: string): Promise<string> {
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(filename, { encoding: 'utf-8' });
    const tenants = this.parse(data);
    console.log(tenants[0].appId);
    return null;
  }
}
