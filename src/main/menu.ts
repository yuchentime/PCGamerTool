import { BrowserWindow, Menu } from 'electron'
import SettingsHandler from './handler/settings'

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
          SettingsHandler.importGame().then((gameName) => {
            // 通知页面更新
            this.mainWindows.webContents.send('updateGameList', gameName)
          })
        }
      },
      {
        label: 'Setting',
        click: () => {
          this.mainWindows.webContents.send('openSetting')
        }
      }
    ]

    const menu = Menu.buildFromTemplate(menuBar)
    Menu.setApplicationMenu(menu)
  }
}