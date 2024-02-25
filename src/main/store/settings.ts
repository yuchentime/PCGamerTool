import Store from 'electron-store'
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from '../constants/SettinsConstant'

const store = new Store()

export const getOriginalFilePath = (gameId: string): string => {
  return String(store.get(SAVE_FILE_PREFIX + gameId))
}

export const setOriginalFilePath = (gameId: string, filePath: string) => {
  String(store.set(SAVE_FILE_PREFIX + gameId, filePath))
}

export const getTargetSaveFolder = (gameId: string): string => {
  return String(store.get(TARGET_SAVE_FOLDER_PREFIX + gameId))
}

export const setTargetSaveFolder = (gameId: string, targetSaveFolder: string) => {
  String(store.set(TARGET_SAVE_FOLDER_PREFIX + gameId, targetSaveFolder))
}
