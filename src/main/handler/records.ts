import { app } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from '../constants/SettinsConstant'
import Stores from '../store/index'
import * as FileUtil from '../util/file'

const RecordsHandler = {
  createNewSaveRecord: (event, gameId: string, comment: string): Promise<string> => {
    const originalFilePath = Stores.settings.get(SAVE_FILE_PREFIX + gameId) || ''
    const targetSaveFolder =
      Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX + gameId) || app.getAppPath()
    return new Promise((resolve, reject) => {
      const id = uuidv4().toLowerCase().replace('-', '')
      const targetSaveFolderStr = String(targetSaveFolder)
      const saveFile = String(originalFilePath)
      const fileName = saveFile.substring(saveFile.lastIndexOf('\\') + 1) + '_' + id
      FileUtil.copyFileToFoler(saveFile, targetSaveFolderStr, fileName)
        ?.then((res) => {
          if (res === 'ok') {
            // generate a new save record
            const saveFileRecord = {
              id: id,
              gameId: gameId,
              filePath: targetSaveFolderStr + '\\' + fileName,
              createdAt: Date.now(),
              comment: comment
            }
            if (Stores.records.get(gameId)) {
              // @ts-ignores
              const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
              Stores.records.set(gameId, [...saveRecordList, saveFileRecord])
            } else {
              Stores.records.set(gameId, [saveFileRecord])
            }
            resolve('ok')
          }
        })
        .catch((err) => {
          console.error(err)
          reject('failed')
        })
      resolve('')
    })
  },
  getSaveRecords: (event, gameId: string) => {
    console.log('querey by gameId: ', gameId)
    if (Stores.records.get(gameId)) {
      // @ts-ignores
      const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
      return saveRecordList
    }
    return []
  }
}
export default RecordsHandler
