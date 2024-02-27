import { globalShortcut } from "electron"
import { checkRunningGame } from "./util/process"
import GameHandler from "./handler/games"

export const registerShortcut = () => {
  globalShortcut.register('F5', () => {
    checkRunningGame().then((name) => {
      if (!name) {
        console.log('no running game')
        name = 'DarkSoulsII'
      }
      GameHandler.createNewSaveFile(name, '')
    })
  })
}
