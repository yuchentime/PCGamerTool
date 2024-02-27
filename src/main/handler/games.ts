import { app, dialog } from 'electron'
import {
  SAVE_FILE_PREFIX,
  TARGET_SAVE_FOLDER_PREFIX,
  GAMES_PREFIX
} from '../constants/SettinsConstant'
import Stores from '../store/index'
import * as FileUtil from '../util/file'
import fs from 'fs'

const GameHandler = {
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
          // @ts-ignore
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
    // @ts-ignore
    return Stores.games.get(GAMES_PREFIX) || []
  },
  recoverySaveFile: (event, gameId: string, saveRecordId: string) => {
    return new Promise((resolve, reject) => {
      const originalFilePath = Stores.settings.has(SAVE_FILE_PREFIX + gameId)
        ? String(Stores.settings.get(SAVE_FILE_PREFIX + gameId))
        : ''
      if (!originalFilePath) {
        reject({
          code: -1,
          msg: 'no save file'
        })
        return
      }
      const targetSaveFolder = Stores.settings.has(TARGET_SAVE_FOLDER_PREFIX + gameId)
        ? String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX + gameId))
        : app.getAppPath()

      const originalFileName = originalFilePath.substring(originalFilePath.lastIndexOf('\\') + 1)
      const saveRecordFilePath = targetSaveFolder + '\\' + originalFileName + '_' + saveRecordId
      if (!fs.existsSync(saveRecordFilePath)) {
        reject({
          code: -1,
          msg: 'no the save record'
        })
        return
      }
      FileUtil.copyFileToFile(saveRecordFilePath, originalFilePath)
      resolve({
        code: 0,
        msg: 'ok'
      })
    })
  }
}

export default GameHandler
