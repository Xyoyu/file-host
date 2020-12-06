import { resolve } from 'path'
import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { AppController } from 'src/app.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { configService } from 'src/config/config.service'
import { UploadModule } from 'src/controllers/uploader/upload.module'

@Module({
  imports: [
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(configService.getFilePath()),
      renderPath: resolve(configService.getFilePath()),
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
