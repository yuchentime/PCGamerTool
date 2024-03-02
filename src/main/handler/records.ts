import { app, shell } from "electron"
import fs from "fs"
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from "../constants/SettinsConstant"
import Stores from "../store/index"
import { generateRecordId } from "../util/date"
import * as FileUtil from "../util/file"

const RecordsHandler = {
  getSaveRecords: (_, gameId: string) => {
    if (Stores.records.get(gameId)) {
      // @ts-ignores
      const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
      return saveRecordList
    }
    return []
  },
  saveComment: (_, gameId: string, saveRecordId: string, comment: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignores
        const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
        const saveRecord = saveRecordList.find((record) => record.id === saveRecordId)
        if (saveRecord) {
          saveRecord.comment = comment
        }
        Stores.records.set(gameId, saveRecordList)
        resolve({
          code: 0,
          msg: "success"
        })
      } catch (error) {
        reject({
          code: -1,
          msg: error
        })
      }
    })
  },
  recoverySaveFile: (_, gameId: string, saveRecordId: string) => {
    return new Promise((resolve) => {
      const originalFilePath = Stores.settings.has(SAVE_FILE_PREFIX + gameId)
        ? String(Stores.settings.get(SAVE_FILE_PREFIX + gameId))
        : ""
      if (!originalFilePath) {
        resolve({
          code: -1,
          msg: "no save file"
        })
        return
      }
      const targetSaveFolder = Stores.settings.has(TARGET_SAVE_FOLDER_PREFIX)
        ? String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX))
        : app.getPath("userData")()
      const gameBackupSaveFolder = targetSaveFolder + "\\" + gameId

      const originalFileName = originalFilePath.substring(originalFilePath.lastIndexOf("\\") + 1)
      const saveRecordFilePath =
        gameBackupSaveFolder + "\\" + saveRecordId + "\\" + originalFileName
      if (!fs.existsSync(saveRecordFilePath)) {
        resolve({
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
  },
  openSaveFileFolder: (_, gameId: string, saveSaveRecordId: string): Promise<any> => {
    return new Promise((resolve) => {
      try {
        const targetSaveFolder = Stores.settings.has(TARGET_SAVE_FOLDER_PREFIX)
          ? String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX))
          : app.getPath("userData")()
        const gameBackupSaveFolder = targetSaveFolder + "\\" + gameId + "\\" + saveSaveRecordId
        if (fs.existsSync(gameBackupSaveFolder)) {
          shell.openPath(gameBackupSaveFolder)
          resolve({
            code: 0,
            msg: "ok"
          })
        } else {
          resolve({
            code: -1,
            msg: "no the save record"
          })
        }
      } catch (error) {
        resolve({
          code: -1,
          msg: error
        })
      }
    })
  },

}

export const createNewSaveRecord = (gameId: string): Promise<string> => {
  const originalFile = String(Stores.settings.get(SAVE_FILE_PREFIX + gameId) || "")
  const targetSaveFolder =
    String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX) || app.getPath("userData")()) + "\\" + gameId
  if (!fs.existsSync(targetSaveFolder)) {
    fs.mkdirSync(targetSaveFolder)
  }

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(originalFile)) {
      reject("file is not exists")
      return
    }
    const id = generateRecordId()
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
