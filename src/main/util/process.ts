import { exec } from 'child_process'
import GameHandler from '../handler/games'

export const checkRunningGame = async () => {
  const gameList = GameHandler.getGameList()
  console.log('gameList: ', gameList)
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
        let name = columns[0].replace(/"/g, '').replace(".exe", "")
        console.log('name: ', name)
        // @ts-ignore
        let runingGame = gameList.find((game) => game.name === name)
        if (runingGame) {
          resolve(runingGame.name)
          return
        }
      }
      resolve('')
    })
  })
}
