import { app } from "electron"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from "../constants/SettinsConstant"
import Stores from "../store/index"
import * as FileUtil from "../util/file"

const RecordsHandler = {
  getSaveRecords: (event, gameId: string) => {
    if (Stores.records.get(gameId)) {
      // @ts-ignores
      const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
      return saveRecordList
    }
    return []
  },
  recoverySaveFile: (event, gameId: string, saveRecordId: string) => {
    return new Promise((resolve, reject) => {
      const originalFilePath = Stores.settings.has(SAVE_FILE_PREFIX + gameId)
        ? String(Stores.settings.get(SAVE_FILE_PREFIX + gameId))
        : ""
      if (!originalFilePath) {
        reject({
          code: -1,
          msg: "no save file"
        })
        return
      }
      const targetSaveFolder = Stores.settings.has(TARGET_SAVE_FOLDER_PREFIX)
        ? String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX))
        : app.getAppPath()
      const gameBackupSaveFolder = targetSaveFolder + "\\" + gameId

      const originalFileName = originalFilePath.substring(originalFilePath.lastIndexOf("\\") + 1)
      const saveRecordFilePath =
        gameBackupSaveFolder + "\\" + saveRecordId + "\\" + originalFileName
      if (!fs.existsSync(saveRecordFilePath)) {
        reject({
          code: -1,
          msg: "no the save record"
        })
        return
      }
      FileUtil.copyFileToFile(saveRecordFilePath, originalFilePath)
      resolve({
        code: 0,
        msg: "ok"
      })
    })
  }
}

export const createNewSaveRecord = (gameId: string): Promise<string> => {
  const originalFile = String(Stores.settings.get(SAVE_FILE_PREFIX + gameId) || "")
  const targetSaveFolder =
    String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX) || app.getAppPath()) + "\\" + gameId
  if (!fs.existsSync(targetSaveFolder)) {
    fs.mkdirSync(targetSaveFolder)
  }

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(originalFile)) {
      reject("file is not exists")
      return
    }
    const id = uuidv4().toLowerCase().replace("-", "")
    const targetSaveFolderStr = String(targetSaveFolder) + "\\" + id
    if (!fs.existsSync(targetSaveFolderStr)) {
      fs.mkdirSync(targetSaveFolderStr)
    }
    const fileName = originalFile.substring(originalFile.lastIndexOf("\\") + 1)
    FileUtil.copyFileToFoler(originalFile, targetSaveFolderStr, fileName)
      ?.then((res) => {
        if (res === "ok") {
          // generate a new save record
          const saveFileRecord = {
            id: id,
            gameId: gameId,
            filePath: targetSaveFolderStr + "\\" + fileName,
            createdAt: Date.now(),
            comment: ""
          }
          if (Stores.records.get(gameId)) {
            // @ts-ignores
            const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
            Stores.records.set(gameId, [...saveRecordList, saveFileRecord])
          } else {
            Stores.records.set(gameId, [saveFileRecord])
          }
          resolve("ok")
        }
      })
      .catch((err) => {
        console.error(err)
        reject("failed")
      })
    resolve("")
  })
}

export default RecordsHandler
