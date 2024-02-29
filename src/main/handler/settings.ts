import { app, dialog } from "electron"
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from "../constants/SettinsConstant"
import Stores from "../store/index"

const SettingsHandler = {
  getGameSettings: (_, gameId: string) => {
    return new Promise((resolve) => {
      const originalFilePath = String(Stores.settings.get(SAVE_FILE_PREFIX + gameId) || "")
      resolve({ originalFilePath })
    })
  },
  getGlobalSettings: (_) => {
    return new Promise((resolve) => {
      const targetSaveFolder = String(
        Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX) || app.getAppPath()
      )
      resolve({ targetSaveFolder })
    })
  },
  setOrinalFilePath: (_, gameId: string): Promise<string> => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: "选择存档文件",
          buttonLabel: "选择",
          properties: ["openFile"]
        })
        .then((res) => {
          const saveFilePath = res.filePaths[0]
          console.log("save: ", saveFilePath)
          Stores.settings.set(SAVE_FILE_PREFIX + gameId.toString(), saveFilePath)
          resolve(saveFilePath)
        })
        .catch(() => {
          resolve("")
        })
    })
  },
  setTargetSaveFolder: (event): Promise<string> => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: "选择备份目录",
          buttonLabel: "选择",
          properties: ["openDirectory"]
        })
        .then((res) => {
          const saveFileDirectory = res.filePaths[0]
          Stores.settings.set(TARGET_SAVE_FOLDER_PREFIX, saveFileDirectory)
          resolve(saveFileDirectory)
        })
        .catch(() => {
          resolve("")
        })
    })
  }
}

export default SettingsHandler
