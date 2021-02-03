import { FileInterceptor } from '@nestjs/platform-express'
import { UploadAuthGuard } from 'src/guards/upload-auth.guard'
import { UploadService } from 'src/controllers/uploader/upload.service'
import {
  Post,
  Body,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

@Controller('upload')
@UseGuards(new UploadAuthGuard())
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: Infinity } }))
  upload(@UploadedFile() file, @Body() body) {
    return this.uploadService.upload(file, body && body.expectedHost)
  }
}
