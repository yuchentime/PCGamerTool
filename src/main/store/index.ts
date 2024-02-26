import ElectronStore from 'electron-store'

const settingStore = new ElectronStore({
  name: 'settings'
})
const recordStore = new ElectronStore({
  name: 'records'
})
const gameStore = new ElectronStore({
  name: 'games'
})

const Store = {
  settings: settingStore,
  records: recordStore,
  games: gameStore,
}

export default Store
