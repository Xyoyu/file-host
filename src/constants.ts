export const Constants = {
  /**
   * The name of the exists file for checking if a file exists already.
   */
  EXISTS_FILE_NAME: 'exists',

  /**
   * Exists file index separator.
   */
  EXISTS_SEPARATOR: ',',

  /**
   * 1mb in Bytes
   */
  ONE_MB_AS_BYTES: 1000000,

  /**
   * Largest allowed uploaded file size in BYTES.
   */
  MAX_UPLOAD_FILE_SIZE: 1000000 * 48, // 48mb

  /**
   * Allowed file types to upload.
   */
  ALLOWED_TYPES: [
    'png',
    'jpeg',
    'gif',
    'mp4',
    'mpga',
    'jpeg',
    'tif',
    'bmp',
    'ico',
    'psd',
    'ai',
    'svg',
    'wav',
    'webm',
    'aac',
    'flac',
    'oga',
    'wma',
    'm4a',
    'html',
  ],
}
