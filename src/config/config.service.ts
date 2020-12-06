import { resolve } from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

class ConfigService {
  constructor(private env: NodeJS.ProcessEnv) {}

  private static isDefined(value: any): boolean {
    return value !== undefined && value !== null
  }

  public get<T = string>(key: string, throwOnNull = false): T {
    const value = this.env[key] as unknown
    if (!ConfigService.isDefined(this.env[key]) && throwOnNull) {
      throw new Error(`Env['${key}'] is not defined.`)
    }
    return value as T
  }

  public ensureValues(keys: string[]): this {
    for (const key of keys) {
      if (!ConfigService.isDefined(this.env[key])) {
        throw new Error(`Env['${key}'] is not defined.`)
      }
    }
    return this
  }

  public isDevelopment(): boolean {
    return (
      ['d', 'dev', 'development'].includes(this.get<string>('NODE_ENV')) ||
      false
    )
  }

  public isDebug(): boolean {
    return this.get<boolean>('DEBUG') || false
  }

  public getPort(): number {
    return this.get<number>('PORT') || 3000
  }

  public getFilePath(): string {
    return resolve(this.get<string>('FILE_PATH', true))
  }

  public getUploadToken(): string {
    return this.get<string>('UPLOAD_TOKEN', true)
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  'FILE_PATH',
  'UPLOAD_TOKEN',
])
