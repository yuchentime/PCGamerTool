import { dialog } from 'electron'
import * as SettingStore from '../store/settings'
const SettingsHandler = {
  getAllSettings: (gameId: string) => {
    return new Promise((resolve) => {
      const originalFilePath = SettingStore.getOriginalFilePath(gameId)
      const targetSaveFolder = SettingStore.getTargetSaveFolder(gameId)
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
          SettingStore.setOriginalFilePath(gameId, saveFilePath)
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
          title: '选择存档文件',
          buttonLabel: '选择',
          properties: ['openDirectory']
        })
        .then((res) => {
          const saveFileDirectory = res.filePaths[0]
          SettingStore.setTargetSaveFolder(gameId, saveFileDirectory)
          resolve(saveFileDirectory)
        })
        .catch(() => {
          resolve('')
        })
    })
  }
}

export default SettingsHandler
