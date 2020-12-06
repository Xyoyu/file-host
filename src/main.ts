import { AppModule } from 'src/app.module'
import { NestFactory } from '@nestjs/core'
import { configService } from 'src/config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(configService.getPort())
}
bootstrap().catch(console.error)
