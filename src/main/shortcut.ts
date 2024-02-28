import { BrowserWindow, globalShortcut } from 'electron'
import * as RecordsHandler from './handler/records'
import { checkRunningGame } from './util/process'

export const registerShortcut = (mainWindows: BrowserWindow) => {
  globalShortcut.register('F5', () => {
    checkRunningGame().then((name) => {
      if (!name) {
        console.log('no running game')
        name = 'DarkSoulsII'
      }
      RecordsHandler.createNewSaveRecord(name)
      mainWindows.webContents.send('notification', "成功创建新存档！")
    })
  })
}
