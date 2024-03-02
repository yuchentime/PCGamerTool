import { exec } from 'child_process'
import GameHandler from '../handler/games'

export const checkRunningGame = async () => {
  const gameList = GameHandler.getGameList()
  return new Promise<string>((resolve, reject) => {
    exec('tasklist /fo csv', (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      // @ts-ignore
      if (!gameList || gameList.length === 0) {
        resolve('')
        return
      }
      const lines = stdout.trim().split('\n').slice(1) // 跳过标题行
      for (const line of lines) {
        const columns = line.split(',')
        let name = columns[0].replace(/"/g, '')
        // @ts-ignore
        let runingGame = gameList.find((game) => game.name.toLowerCase() === name)
        if (runingGame) {
          resolve(runingGame.name)
          return
        }
      }
      resolve('')
    })
  })
}
