import Store from 'electron-store'
type SaveRecord = {
  id: string
  gameId: string
  filePath: string
  createdAt: number
  comment: string
}

export const saveFileRecord = (saveRecord: SaveRecord) => {
  const store = new Store()
  store.set(saveRecord.id, saveRecord)
}
