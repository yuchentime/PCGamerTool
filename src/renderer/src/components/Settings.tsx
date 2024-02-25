import React from 'react'

const Setting = ({ props }) => {
  const [originalFilePosition, setOriginalFilePosition] = React.useState('')
  const [backupDirectory, setBackupDirectory] = React.useState('')
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

  return (
    <>
      <div className="flex items-center">
        <h4 className="mr-10 font-bold">源存档文件</h4>
        {/* <input
          type="text"
          readOnly
          value={originalFilePosition}
          placeholder="点击选择存档文件地址"
          className="input input-bordered input-sm w-full max-w-xs cursor-default"
          onClick={setOriginalFilePositionFn}
        /> */}
        <div className="mr-5">{originalFilePosition}</div>
        <button className="btn btn-sm" onClick={setOriginalFilePositionFn}>
          更改地址
        </button>
      </div>
      <div className="flex items-center mt-10">
        <h4 className="mr-10 font-bold">备份目录</h4>
        {/* <input
          type="text"
          readOnly
          value={backupDirectory}
          placeholder="点击选择备份目录"
          className="input input-bordered input-sm w-full max-w-xs cursor-default"
          onClick={setBackupDirectoryFn}
        /> */}
        <div className="mr-5">{backupDirectory}</div>
        <button className="btn btn-sm" onClick={setBackupDirectoryFn}>
          更改目录
        </button>
      </div>
    </>
  )
}

export default Setting
