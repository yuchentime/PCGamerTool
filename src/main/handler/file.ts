import { v4 as uuidv4 } from 'uuid'
import * as RecordStore from '../store/records'
import * as FileUtil from '../util/file'
import * as SettingStore from '../store/settings'

const FileHandler = {
  createNewSaveFile: (gameId: string, comment: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      FileUtil.copyFileToFoler(
        SettingStore.getOriginalFilePath(gameId),
        SettingStore.getTargetSaveFolder(gameId)
      )
        ?.then((res) => {
          if (res === 'ok') {
            // generate a new save record
            const saveFileRecord = {
              id: uuidv4(),
              gameId: gameId,
              filePath: SettingStore.getTargetSaveFolder(gameId),
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
