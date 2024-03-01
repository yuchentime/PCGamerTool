import { ElectronAPI } from '@electron-toolkit/preload'
import { type } from 'os'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
  type SaveRecord = {
    id: string
    gameId: string
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

  type ElectronResponse = {
    code: number
    msg: string
  }
}

export {}
