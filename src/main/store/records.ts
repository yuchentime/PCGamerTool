import Store from 'electron-store'

export const saveFileRecord = (saveRecord: SaveRecord) => {
  const store = new Store()
  store.set(saveRecord.id, saveRecord)
}
