import { app, dialog } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import {
  SAVE_FILE_PREFIX,
  TARGET_SAVE_FOLDER_PREFIX,
  RECORDS_PREFIX,
  GAMES_PREFIX
} from '../constants/SettinsConstant'
import Stores from '../store/index'
import * as FileUtil from '../util/file'

const GameHandler = {
  createNewSaveFile: (gameId: string, comment: string): Promise<string> => {
    const originalFilePath = Stores.settings.get(SAVE_FILE_PREFIX + gameId) || ''
    const targetSaveFolder =
      Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX + gameId) || app.getAppPath()
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
            // @ts-ignores
            const gameList: SaveRecord[] = Stores.games.get(RECORDS_PREFIX + gameId) || []
            if (gameList) {
              Stores.games.set(RECORDS_PREFIX + gameId, [...gameList, saveFileRecord])
            } else {
              Stores.games.set(RECORDS_PREFIX + gameId, [saveFileRecord])
            }
            Stores.records.set(gameId, saveFileRecord)
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
  getGameList: (): Game[] => {
    return (Stores.games.get(GAMES_PREFIX) as Game[]) || []
  }
}

export default GameHandler
