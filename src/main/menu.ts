import { BrowserWindow, Menu } from 'electron'
import GameHandler from './handler/games'
import {info} from 'electron-log'

export default class MenuBuilder {
  mainWindows: BrowserWindow

  constructor(mainWindows: BrowserWindow) {
    this.mainWindows = mainWindows
  }

  buildMenu() {
    const menuBar = [
      {
        label: 'Select Game',
        click: () => {
          GameHandler.importGame().then((gameName) => {
            // 通知页面更新
            info('updateGameList')
            this.mainWindows.webContents.send('updateGameList', gameName)
          })
        }
      },
      {
        label: 'Setting',
        click: () => {
          info('openSetting')
          this.mainWindows.webContents.send('openSetting')
        }
      }
    ]

    const menu = Menu.buildFromTemplate(menuBar)
    Menu.setApplicationMenu(menu)
  }
}
