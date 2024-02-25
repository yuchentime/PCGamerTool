import Store from 'electron-store'
import {
  SAVE_FILE_PREFIX,
  TARGET_SAVE_FOLDER_PREFIX,
  SAVE_SHORTCURT
} from '../constants/SettinsConstant'

const store = new Store()

export const getOriginalFilePath = (gameId: string): string => {
  if (store.has(SAVE_FILE_PREFIX + gameId)) {
    return String(store.get(SAVE_FILE_PREFIX + gameId))
  }
  return ''
}

export const setOriginalFilePath = (gameId: string, filePath: string) => {
  store.set(SAVE_FILE_PREFIX + gameId, filePath)
}

export const getTargetSaveFolder = (gameId: string): string => {
  if (store.has(TARGET_SAVE_FOLDER_PREFIX + gameId)) {
    return String(store.get(TARGET_SAVE_FOLDER_PREFIX + gameId))
  }
  return ''
}

export const setTargetSaveFolder = (gameId: string, targetSaveFolder: string) => {
  store.set(TARGET_SAVE_FOLDER_PREFIX + gameId, targetSaveFolder)
}

export const setGlobalSaveShortcut = (shortcut: string) => {
  store.set(SAVE_SHORTCURT, shortcut)
}

export const getGlobalSaveShortcut = (): string => {
  if (store.has(SAVE_SHORTCURT)) {
    return String(store.get(SAVE_SHORTCURT))
  }
  return 'F5';
}
