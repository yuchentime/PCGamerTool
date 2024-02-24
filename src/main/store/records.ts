import Store from 'electron-store'
import { SaveRecord } from '../../type/record'

export const saveFileRecord = (saveRecord: SaveRecord) => {
  const store = new Store()
  store.set(saveRecord.id, saveRecord)
}
