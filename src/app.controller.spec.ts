import { AppService } from 'src/app.service'
import { AppController } from 'src/app.controller'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.testRoute()).toBe('Hello World!')
    })
  })
})
