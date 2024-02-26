import { app } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from '../constants/SettinsConstant'
import Stores from '../store/index'
import * as FileUtil from '../util/file'

const FileHandler = {
  createNewSaveFile: (gameId: string, comment: string): Promise<string> => {
    const originalFilePath = Stores.settings.get(SAVE_FILE_PREFIX + gameId) || ''
    const targetSaveFolder =
      Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX + gameId) || app.getAppPath()
    console.log('originalFilePath: ', originalFilePath)
    console.log('targetSaveFolder: ', targetSaveFolder)
    return new Promise((resolve, reject) => {
      FileUtil.copyFileToFoler(String(originalFilePath), String(targetSaveFolder))
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
            // TODO
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
