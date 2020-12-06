import { Module } from '@nestjs/common'
import { UploadService } from 'src/controllers/uploader/upload.service'
import { UploadController } from 'src/controllers/uploader/upload.controller'

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
