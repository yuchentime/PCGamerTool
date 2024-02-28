import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
  type SaveRecord = {
    id: string
    gameId: string
    filePath: string
    createdAt: number
    comment: string
  }

  type Game = {
    name: string
    thumbnail?: string
  }

  type Alert = {
    msg: string
    alertType: string
  }
}

export {}
