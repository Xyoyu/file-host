import { AppService } from 'src/app.service'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  testRoute(): string {
    return this.appService.test()
  }
}
