import * as fetch from 'node-fetch';
import { Logger, Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  private readonly logger = new Logger(TemplateService.name);

  templateCache: Map<string, string> = new Map();

  async resolve(templateUrl: string): Promise<string> {
    if (!this.templateCache.has(templateUrl)) {
      this.logger.log(`Fetching template from ${templateUrl}`);
      const res = await fetch(templateUrl);
      const content = await res.text();
      this.templateCache.set(templateUrl, content);
    }
    return this.templateCache.get(templateUrl);
  }

  invalidate(): void {
    this.templateCache.clear();
  }

  render(template: string, params?: any): string {
    const compiled = Handlebars.compile(template);
    return compiled(params);
  }
}
