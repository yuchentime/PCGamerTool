import { BrowserWindow, globalShortcut } from "electron"
import * as RecordsHandler from "./handler/records"
import { checkRunningGame } from "./util/process"

export const registerShortcut = (mainWindows: BrowserWindow) => {
  globalShortcut.register("Ctrl+F5", () => {
    checkRunningGame().then((name) => {
      if (!name) {
        console.log("no running game")
        return
      }
      console.log("current running game: ", name)

      RecordsHandler.createNewSaveRecord(name).then((res) => {
        if (!res) {
          mainWindows.webContents.send("notification", "创建新存档失败！")
        } else if (res.code === 0) {
          mainWindows.webContents.send("notification", "创建新存档成功！")
        } else {
          mainWindows.webContents.send("notification", res.msg)
        }
      })
    })
  })
}
