import React from 'react'

const Settings = ({ props }) => {
  const { gameId } = props

  const [originalFilePosition, setOriginalFilePosition] = React.useState('')
  const [backupDirectory, setBackupDirectory] = React.useState('')

  React.useEffect(() => {
    window.electron.ipcRenderer.invoke('getAllSettings', gameId).then((properties) => {
      if (properties) {
        setOriginalFilePosition(properties.originalFilePath)
        setBackupDirectory(properties.targetSaveFolder)
      }
    })
  }, [])

  const setOriginalFilePositionFn = async () => {
    const filePath = await window.electron.ipcRenderer.invoke('setOrinalFilePath', gameId)
    setOriginalFilePosition(filePath)
  }
  const setBackupDirectoryFn = async () => {
    const backupDirectory = await window.electron.ipcRenderer.invoke('setTargetSaveFolder', gameId)
    setBackupDirectory(backupDirectory)
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
    </>
  )
}

export default Settings
