export type UploadedFile = {
  fieldname: string
  originalname: string
  encoding: BufferEncoding
  mimetype: MimeType['type']
  buffer: Buffer
  size: number
}
