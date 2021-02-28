import { Controller, Get } from '@nestjs/common';

@Controller('actuator/health')
export class MonitoringController {
  @Get()
  index(): any {
    return {
      status: 'UP',
    };
  }
}
