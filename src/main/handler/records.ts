import { app, shell } from "electron"
import fs from "fs"
import { SAVE_FILE_PREFIX, TARGET_SAVE_FOLDER_PREFIX } from "../constants/SettinsConstant"
import Stores from "../store/index"
import { generateRecordId } from "../util/date"
import * as FileUtil from "../util/file"
import path from "path"
import { getScreenshot } from "../util/capture"

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
        : app.getPath("userData")
      const gameBackupSaveFolder = path.join(targetSaveFolder, gameId)

      const originalFileName = originalFilePath.substring(originalFilePath.lastIndexOf("\\") + 1)
      const saveRecordFilePath = path.join(gameBackupSaveFolder, saveRecordId, originalFileName)
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
          : app.getPath("userData")
        const gameBackupSaveFolder = path.join(targetSaveFolder, gameId, saveSaveRecordId)
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
  }
}

export const createNewSaveRecord = async (gameId: string): Promise<any> => {
  const originalFile = String(Stores.settings.get(SAVE_FILE_PREFIX + gameId) || "")
  const targetSaveFolder = path.join(
    String(Stores.settings.get(TARGET_SAVE_FOLDER_PREFIX) || app.getPath("userData")),
    gameId
  )
  if (!fs.existsSync(targetSaveFolder)) {
    fs.mkdirSync(targetSaveFolder)
  }

  if (!fs.existsSync(originalFile)) {
    return {
      code: -1,
      msg: "no save file"
    }
  }
  const id = generateRecordId()
  const targetSaveFolderStr = path.join(String(targetSaveFolder), id)
  if (!fs.existsSync(targetSaveFolderStr)) {
    fs.mkdirSync(targetSaveFolderStr)
  }

  // TODO 还要处理显示屏问题，可能存在多个显示器
  const screenshotPath = path.join(String(targetSaveFolder), "_screenshots")
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath)
  }

  console.log("screenshotPath: ", screenshotPath)

  const screenshotFilePath = path.join(screenshotPath, id + ".png")
  const screenshotFileBuffer = await getScreenshot()
  if (screenshotFileBuffer) {
    fs.writeFileSync(screenshotFilePath, screenshotFileBuffer)
  }

  const fileName = originalFile.substring(originalFile.lastIndexOf("\\") + 1)
  const res = await FileUtil.copyFileToFoler(originalFile, targetSaveFolderStr, fileName)
  if (res && res === "ok") {
    // generate a new save record
    const saveFileRecord = {
      id: id,
      gameId: gameId,
      createdAt: Date.now(),
      screenshot: screenshotFilePath,
      comment: ""
    }
    if (Stores.records.get(gameId)) {
      // @ts-ignores
      const saveRecordList: SaveRecord[] = Stores.records.get(gameId)
      Stores.records.set(gameId, [...saveRecordList, saveFileRecord])
    } else {
      Stores.records.set(gameId, [saveFileRecord])
    }
    return {
      code: 0,
      msg: "success"
    }
  }
  return {
    code: -1,
    msg: "Failed"
  }
}

export default RecordsHandler
