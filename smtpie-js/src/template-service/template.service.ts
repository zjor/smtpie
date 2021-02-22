import * as fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  templateCache: Map<string, string> = new Map();
  async resolve(templateUrl: string): Promise<string> {
    if (!this.templateCache.has(templateUrl)) {
      const res = await fetch(templateUrl);
      const content = await res.text();
      this.templateCache.set(templateUrl, content);
    }
    return this.templateCache.get(templateUrl);
  }

  render(template: string, params?: any): string {
    const compiled = Handlebars.compile(template);
    return compiled(params);
  }
}
