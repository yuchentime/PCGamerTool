import { app, dialog } from 'electron'
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from '../constants/SettinsConstant'
import Stores from '../store/index'

const SettingsHandler = {
  getAllSettings: (gameId: string) => {
    return new Promise((resolve) => {
      const originalFilePath = Stores.settings.get(SAVE_FILE_PREFIX + gameId) || ''
      const targetSaveFolder =
        Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX + gameId) || app.getAppPath()
      resolve({ originalFilePath, targetSaveFolder })
    })
  },
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
          Stores.settings.set(SAVE_FILE_PREFIX + gameId, saveFilePath)
          resolve(saveFilePath)
        })
        .catch(() => {
          resolve('')
        })
    })
  },
  setTargetSaveFolder: (gameId: string): Promise<string> => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: '选择备份目录',
          buttonLabel: '选择',
          properties: ['openDirectory']
        })
        .then((res) => {
          const saveFileDirectory = res.filePaths[0]
          Stores.settings.set(TARGET_SAVE_FOLDER_PREFIX + gameId, saveFileDirectory)
          resolve(saveFileDirectory)
        })
        .catch(() => {
          resolve('')
        })
    })
  }
}

export default SettingsHandler
