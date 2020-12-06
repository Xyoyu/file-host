import { resolve } from 'path'
import { generate } from 'shortid'
import { Constants } from 'src/constants'
import { configService } from 'src/config/config.service'
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'fs'

const FILE_BASE = configService.getFilePath()

export class ExistingTxtService {
  private static path: string = resolve(
    FILE_BASE,
    Constants.EXISTS_FILE_NAME + '.txt',
  )

  public static generateUniqueId(overrideIndexes?: string[]): string {
    const index = generate()
    const indexes = overrideIndexes || ExistingTxtService.get()
    if (indexes && indexes.includes(index)) {
      return ExistingTxtService.generateUniqueId(indexes)
    }
    return index
  }

  public static get(): string[] | null {
    if (!existsSync(FILE_BASE)) {
      mkdirSync(FILE_BASE)
    }
    if (existsSync(ExistingTxtService.path)) {
      const existsFile = readFileSync(ExistingTxtService.path, 'utf8')
      if (existsFile) {
        return existsFile.split(Constants.EXISTS_SEPARATOR)
      }
    } else {
      return null
    }
  }

  public static save(indexes: string[]): void {
    const fileData = indexes.join(Constants.EXISTS_SEPARATOR)
    writeFileSync(ExistingTxtService.path, fileData, 'utf8')
  }

  /**
   * Appends a file name to the array of existing files.
   */
  public static append(index: string): void {
    const indexes = ExistingTxtService.get()
    if (!indexes) {
      ExistingTxtService.save([index])
    } else {
      indexes.push(index)
      ExistingTxtService.save(indexes)
    }
  }

  /**
   * Removes a file name from the array of existing files.
   */
  public static remove(index: string): void {
    const indexes = ExistingTxtService.get()
    if (!indexes) {
      return
    }
    ExistingTxtService.save(
      indexes.filter((existingIndex) => existingIndex !== index),
    )
  }
}
