import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getGameList: async () => {
    return await ipcRenderer.invoke('getGameList')
  },
  getSaveRecords: async (gameId: string) => {
    return await ipcRenderer.invoke('getSaveRecords', gameId)
  },
  recoverySaveFile: async (gameId: string, saveRecordId: string) => {
    return await ipcRenderer.invoke('recoverySaveFile', gameId, saveRecordId)
  },
  getGameSettings: async (gameId: string) => {
    return await ipcRenderer.invoke('getGameSettings', gameId)
  },
  setOrinalFilePath: async (gameId: string) => {
    return await ipcRenderer.invoke('setOrinalFilePath', gameId)
  },
  setTargetSaveFolder: async () => {
    return await ipcRenderer.invoke('setTargetSaveFolder')
  },
  getGlobalSettings: async () => {
    return await ipcRenderer.invoke('getGlobalSettings')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
