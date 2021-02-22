import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  async resolve(templateUrl: string): Promise<string> {
    //TODO: cache
    const res = await fetch(templateUrl);
    return await res.text();
  }

  render(template: string, params?: any): string {
    const compiled = Handlebars.compile(template);
    return compiled(params);
  }
}
