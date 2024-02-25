import { v4 as uuidv4 } from 'uuid'
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from '../constants/SettinsConstant'
import * as RecordStore from '../store/records'
import * as SettingStore from '../store/settings'
import * as FileUtil from '../util/file'
import { app } from 'electron'

const FileHandler = {
  createNewSaveFile: (gameId: string, comment: string): Promise<string> => {
    const originalFilePath: string = SettingStore.store.get(SAVE_FILE_PREFIX + gameId) || ''
    const targetSaveFolder: string =
      SettingStore.store.get(TARGET_SAVE_FOLDER_PREFIX + gameId) || app.getAppPath()
    return new Promise((resolve, reject) => {
      FileUtil.copyFileToFoler(originalFilePath, targetSaveFolder)
        ?.then((res) => {
          if (res === 'ok') {
            // generate a new save record
            const saveFileRecord = {
              id: uuidv4(),
              gameId: gameId,
              filePath: originalFilePath,
              createdAt: Date.now(),
              comment: comment
            }
            RecordStore.saveFileRecord(saveFileRecord)
            resolve('ok')
          }
        })
        .catch((err) => {
          console.error(err)
          reject('failed')
        })
    })
  }
}

export default FileHandler
