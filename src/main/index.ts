import { electronApp, is, optimizer } from "@electron-toolkit/utils"
import {
  BrowserWindow,
  ProtocolRequest,
  app,
  globalShortcut,
  ipcMain,
  nativeImage,
  protocol,
  shell
} from "electron"
import { join } from "path"
import icon from "../../resources/icon.png?asset"
import GameHandler from "./handler/games"
import RecordsHandler from "./handler/records"
import SettingsHandler from "./handler/settings"
import MenuBuilder from "./menu"
import { registerShortcut } from "./shortcut"

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
  }
  return mainWindow
}

protocol.registerSchemesAsPrivileged([{ scheme: "file", privileges: { bypassCSP: true } }])
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file://", "")
    console.log("pathname: ", pathname)
    callback(pathname)
  })

  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron")

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  registerHandler()

  const mainWindow = createWindow()

  registerShortcut(mainWindow)

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("will-quit", () => globalShortcut.unregisterAll())
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const registerHandler = () => {
  const handlerList = {
    ...GameHandler,
    ...SettingsHandler,
    ...RecordsHandler
  }
  Object.entries(handlerList).forEach(([name, handler]) => {
    // @ts-ignore
    ipcMain.handle(name, handler)
  })

  ipcMain.handle("getPic", () => {
    const image = nativeImage.createFromPath(
      "C://Users//Administrator//AppData//Roaming//steam-source-manager//eldenring.jpg"
    )
    console.log(image)
    return image
  })
}
function GetSomeFilePath(url: string) {
  throw new Error("Function not implemented.")
}
