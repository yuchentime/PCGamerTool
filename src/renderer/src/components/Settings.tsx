import React from 'react'

const Setting = ({ props }) => {
  const [originalFilePosition, setOriginalFilePosition] = React.useState('')
  const [backupDirectory, setBackupDirectory] = React.useState('')
  const [saveShortcut, setSaveShortcut] = React.useState('F5')

  window.electron.ipcRenderer.invoke('getAllSettings', 'Elden Ring').then((properties) => {
    setOriginalFilePosition(properties.originalFilePath)
    setBackupDirectory(properties.targetSaveFolder)
  })

  const setOriginalFilePositionFn = async () => {
    const filePath = await window.electron.ipcRenderer.invoke('setOrinalFilePath', 'Elden Ring')
    setOriginalFilePosition(filePath)
  }
  const setBackupDirectoryFn = async () => {
    const backupDirectory = await window.electron.ipcRenderer.invoke(
      'setTargetSaveFolder',
      'Elden Ring'
    )
    setBackupDirectory(backupDirectory)
  }

  const setSaveShortcutFn = async  (shortcut: string) => {
    await window.electron.ipcRenderer.invoke('setOrinalFilePath', shortcut)
  }

  return (
    <>
      <div className="flex items-center">
        <h4 className="mr-10 font-bold">源存档文件</h4>
        <div className="mr-5">{originalFilePosition}</div>
        <button className="btn btn-sm" onClick={setOriginalFilePositionFn}>
          更改地址
        </button>
      </div>
      <div className="flex items-center mt-10">
        <h4 className="mr-10 font-bold">备份目录</h4>
        <div className="mr-5">{backupDirectory}</div>
        <button className="btn btn-sm" onClick={setBackupDirectoryFn}>
          更改目录
        </button>
      </div>
      {/* <div className="flex items-center mt-10">
        <h4 className="mr-10 font-bold">手动存档快捷键</h4>
        <input
          type="text"
          readOnly
          value={saveShortcut}
          className="input input-bordered input-sm w-1/5 max-w-xs"
          onFocus={(e) => {
            window.addEventListener('keydown', (e) => {
              setSaveShortcutFn(saveShortcut + '+' + e.key)
              setSaveShortcut((prev) => prev + '+' + e.key)
            })
          }}
        />
      </div> */}
    </>
  )
}

export default Setting
