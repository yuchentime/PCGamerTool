import ElectronStore from 'electron-store'

const settingStore = new ElectronStore({
  name: 'settings'
})

const Store = {
  settings: settingStore
}

export default Store
