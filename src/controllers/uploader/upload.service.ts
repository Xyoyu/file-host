import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { extension } from 'mime-types'
import { Constants } from 'src/constants'
import { configService } from 'src/config/config.service'
import { UploadedFile } from 'src/types/UploadedFile.type'
import { ExistingTxtService } from 'src/services/existing-txt.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

const maxFileSizeInMb = (
  Constants.MAX_UPLOAD_FILE_SIZE / Constants.ONE_MB_AS_BYTES
).toFixed(2)

@Injectable()
export class UploadService {
  upload(file: UploadedFile, expectedHost?: string) {
    if (!file || !file.buffer) {
      return new HttpException('No file provided', HttpStatus.BAD_REQUEST)
    }

    const fileExtension = extension(file.mimetype)
    if (!fileExtension || !Constants.ALLOWED_TYPES.includes(fileExtension)) {
      return new HttpException(
        `File type '${file.mimetype}' is not allowed`,
        HttpStatus.BAD_REQUEST,
      )
    }

    if (file.size > Constants.MAX_UPLOAD_FILE_SIZE) {
      const fileSizeInMb = (file.size / Constants.ONE_MB_AS_BYTES).toFixed(2)
      return new HttpException(
        `File size ${fileSizeInMb}mb is too big. Max upload file size: ${maxFileSizeInMb}mb`,
        HttpStatus.BAD_REQUEST,
      )
    }

    const fileIndex = ExistingTxtService.generateUniqueId()
    const extensionWithDot = `.${fileExtension}` // I know, it's stupid

    try {
      writeFileSync(
        resolve(configService.getFilePath(), fileIndex + extensionWithDot),
        file.buffer,
      )
      ExistingTxtService.append(fileIndex)
    } catch (e) {
      console.error(e)
      return new HttpException(
        'File upload failure, try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    return (expectedHost || '/') + fileIndex + extensionWithDot // But this is why
  }
}
