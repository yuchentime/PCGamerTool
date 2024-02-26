import ElectronStore from 'electron-store'

const settingStore = new ElectronStore({
  name: 'settings'
})
const recordStore = new ElectronStore({
  name: 'records'
})

const Store = {
  settings: settingStore,
  records: recordStore
}

export default Store
