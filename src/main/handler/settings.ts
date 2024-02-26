import { app, dialog } from 'electron'
import {
  SAVE_FILE_PREFIX,
  TARGET_SAVE_FOLDER_PREFIX,
  GAMES_PREFIX
} from '../constants/SettinsConstant'
import Stores from '../store/index'

const SettingsHandler = {
  getAllSettings: (event, gameId: string) => {
    return new Promise((resolve) => {
      const originalFilePath = Stores.settings.get(SAVE_FILE_PREFIX + gameId) || ''
      const targetSaveFolder =
        Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX + gameId) || app.getAppPath()
      resolve({ originalFilePath, targetSaveFolder })
    })
  },
  setOrinalFilePath: (event, gameId: string): Promise<string> => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: '选择存档文件',
          buttonLabel: '选择',
          properties: ['openFile']
        })
        .then((res) => {
          const saveFilePath = res.filePaths[0]
          console.log('保存：', SAVE_FILE_PREFIX + gameId.toString())
          Stores.settings.set(SAVE_FILE_PREFIX + gameId.toString(), saveFilePath)
          resolve(saveFilePath)
        })
        .catch(() => {
          resolve('')
        })
    })
  },
  setTargetSaveFolder: (event, gameId: string): Promise<string> => {
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
  },
  importGame: () => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: '导入游戏',
          buttonLabel: '选择',
          properties: ['openFile']
        })
        .then((res) => {
          const gameLanunchPath = res.filePaths[0]
          const gameName = gameLanunchPath
            .substring(gameLanunchPath.lastIndexOf('\\'), gameLanunchPath.lastIndexOf('.exe'))
            .replace('\\', '')
          console.log('gameName is: ', gameName)
          const gameList: Game[] = Stores.games.get(GAMES_PREFIX)
          if (gameList && !gameList.find((item) => item.name === gameName)) {
            Stores.games.set(GAMES_PREFIX, [...gameList, { name: gameName }])
          } else {
            Stores.games.set(GAMES_PREFIX, [{ name: gameName }])
          }
          resolve(gameName)
        })
        .catch(() => {
          resolve('')
        })
    })
  },
  getGameList: () => {
    return Stores.games.get(GAMES_PREFIX) || []
  }
}

export default SettingsHandler
