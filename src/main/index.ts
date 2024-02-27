import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { exec } from 'child_process'
import { BrowserWindow, app, globalShortcut, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import GameHandler from './handler/games'
import SettingsHandler from './handler/settings'
import MenuBuilder from './menu'
import RecordsHandler from './handler/records'
import Store from './store'

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  registerHandler()

  registerShortcut()

  const mainWindow = createWindow()

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const handlerList = {
  ...GameHandler,
  ...SettingsHandler,
  ...RecordsHandler
}

const registerHandler = () => {
  Object.entries(handlerList).forEach(([name, handler]) => {
    // @ts-ignore
    ipcMain.handle(name, handler)
  })
}

const registerShortcut = () => {
  globalShortcut.register('F5', () => {
    checkRunningGame().then((name) => {
      if (!name) {
        return
      }
      handlerList.createNewSaveFile(name || 'Dark Souls II Scholar of the First Sin', '')
    })
  })
}

const checkRunningGame = async () => {
  const gameList = GameHandler.getGameList()
  return new Promise<string>((resolve, reject) => {
    exec('tasklist /fo csv', (error, stdout) => {
      if (error) {
        reject(error)
        return
      }
      if (!gameList || gameList.length === 0) {
        resolve('')
        return
      }
      const lines = stdout.trim().split('\n').slice(1) // 跳过标题行
      for (const line of lines) {
        const columns = line.split(',')
        let name = columns[0].replace(/"/g, '')
        let runingGame = gameList.find((game) => game.name.toLowerCase() === name)
        if (runingGame) {
          resolve(runingGame.name)
          return
        }
      }
      resolve('')
    })
  })
}
