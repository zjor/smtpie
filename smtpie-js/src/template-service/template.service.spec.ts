import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateService],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
  });

  it('should fetch the template', async () => {
    const template = await service.resolve('');
    
  });

  it('should render template with params', () => {
    const template = 'Hello, {{name}}';
    const params = { name: 'Alice' };
    expect(service.render(template, params)).toEqual('Hello, Alice');
  });

  it('should render template with no params', () => {
    const template = 'Hello, {{name}}';
    expect(service.render(template)).toEqual('Hello, ');
  });
});
