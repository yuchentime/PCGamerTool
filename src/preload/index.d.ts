import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
  export type SaveRecord = {
    id: string
    gameId: string
    filePath: string
    createdAt: number
    comment: string
  }

  export type Game = {
    name: string
    thumbnail?: string
  }
}
