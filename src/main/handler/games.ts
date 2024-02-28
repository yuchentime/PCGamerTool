import { dialog } from 'electron'
import {
  GAMES_PREFIX
} from '../constants/SettinsConstant'
import Stores from '../store/index'

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
  }
}

export default GameHandler
