import { app, dialog, shell } from "electron"
import fs from "fs"
import path from "path"
import {
  GAMES_PREFIX,
  SAVE_FILE_PREFIX,
  TARGET_SAVE_FOLDER_PREFIX
} from "../constants/SettinsConstant"
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
        Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX) || path.join(app.getPath("userData"), "backup")
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
          Stores.settings.set(SAVE_FILE_PREFIX + gameId.toString(), saveFilePath)
          resolve(saveFilePath)
        })
        .catch(() => {
          resolve("")
        })
    })
  },
  setTargetSaveFolder: (): Promise<string> => {
    return new Promise((resolve) => {
      dialog
        .showOpenDialog({
          title: "选择备份目录",
          buttonLabel: "选择",
          properties: ["openDirectory"]
        })
        .then((res) => {
          const saveFileDirectory = res.filePaths[0]
          const oldSaveFileFolder = String(
            Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX) || app.getPath("userData")
          )
          transferBackupFolder(oldSaveFileFolder, saveFileDirectory).then((result) => {
            if (result) {
              Stores.settings.set(TARGET_SAVE_FOLDER_PREFIX, saveFileDirectory)
              resolve(saveFileDirectory)
            } else {
              resolve("")
            }
          })
        })
        .catch(() => {
          resolve("")
        })
    })
  },
  startGame: (_, gameId: string) => {
    // @ts-ignores
    const games = Stores.games.get(GAMES_PREFIX)
    if (games) {
      const game = (games as Array<any>).find((item) => item.name === gameId)
      if (game) {
        console.log("startGame: ", game)
        shell.openPath(game.lanunchPath)
      }
    }
  }
}

const transferBackupFolder = (source: string, destination: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!fs.existsSync(source)) {
      return
    }
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination)
    }
    const files = fs.readdirSync(source)
    try {
      files.forEach((file) => {
        const current = path.join(source, file)
        const target = path.join(destination, file)
        if (fs.lstatSync(current).isDirectory()) {
          transferBackupFolder(current, target)
        } else {
          fs.renameSync(current, target)
        }
      })

      fs.rmdirSync(source, { recursive: true })
      resolve(true)
    } catch (error) {
      console.error(error)
    }
  })
}

export default SettingsHandler
