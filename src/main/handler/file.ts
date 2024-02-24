import { dialog } from 'electron'
import * as fs from 'fs'
import { uuidv4 } from 'uuid'
import * as RecordStore from '../store/records'
import * as SettingStore from '../store/settings'
import * as FileUtil from '../util/file'

const FileHandler = {
  setOrinalFilePath: (gameId: string): Promise<string> => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: '选择存档文件',
          buttonLabel: '选择',
          properties: ['openFile']
        })
        .then((res) => {
          const saveFilePath = res.filePaths[0]
          SettingStore.setOriginalFilePath(gameId, saveFilePath)
          resolve(saveFilePath)
        })
        .catch(() => {
          resolve('')
        })
    })
  },
  setTargetSaveFolder: (gameId: string, targetSaveFolder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(targetSaveFolder)) {
          fs.mkdirSync(targetSaveFolder)
        }
      } catch (err) {
        console.error(err)
        reject('failed')
      }
      SettingStore.setTargetSaveFolder(gameId, targetSaveFolder)
      resolve('ok')
    })
  },
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
