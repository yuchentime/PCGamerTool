import { globalShortcut } from 'electron'
import RecordsHandler from './handler/records'
import { checkRunningGame } from './util/process'

export const registerShortcut = () => {
  globalShortcut.register('F5', () => {
    checkRunningGame().then((name) => {
      if (!name) {
        console.log('no running game')
        name = 'DarkSoulsII'
      }
      RecordsHandler.createNewSaveRecord(name, '')
    })
  })
}
