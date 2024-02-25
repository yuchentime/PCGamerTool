import { uuidv4 } from 'uuid'
import * as RecordStore from '../store/records'
import * as FileUtil from '../util/file'
import * as SettingStore from '../store/settings'

const FileHandler = {
  createNewSaveFile: (gameId: string, comment: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        FileUtil.copyFileToFoler(
          SettingStore.getOriginalFilePath(gameId),
          SettingStore.getTargetSaveFolder(gameId)
        )
      } catch (err) {
        console.error(err)
        reject('failed')
      }
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
    })
  }
}

export default FileHandler
