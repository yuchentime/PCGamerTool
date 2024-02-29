import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router"
const GlobalSettings = ({}) => {
  const navigate = useNavigate()
  const [autoStatistics, setAutoStatistics] = React.useState(false)
  const [backupDirectory, setBackupDirectory] = React.useState("")

  React.useEffect(() => {
    // @ts-ignores
    window.api.getGlobalSettings().then((properties) => {
      if (properties) {
        setBackupDirectory(properties.targetSaveFolder)
      }
    })
  }, [])

  const setBackupDirectoryFn = async () => {
    // @ts-ignores
    window.api.setTargetSaveFolder().then((backupDirectory) => {
      setBackupDirectory(backupDirectory)
    })
  }

  const toBack = () => {
    // 如果是-1，则需要点击两次
    navigate(-2)
  }

  return (
    <div className="flex">
      <div className="items-center text-zinc-600 m-2 p-2">
        <IoArrowBack className="cursor-pointer" onClick={toBack} />
        {/* 每60s查询后台进程 */}
        <div className="flex ">
          <h4 className="mr-10 font-bold">自动统计游戏时长</h4>
          <div className="mr-5">
            <input
              type="checkbox"
              className="toggle"
              checked={autoStatistics}
              onChange={() => setAutoStatistics(!autoStatistics)}
            />
          </div>
        </div>
        <div className="flex ">
          <h4 className="mr-10 font-bold">每日游戏时长上限提醒</h4>
          <div className="mr-5">
            <input type="input" />
          </div>
        </div>
        <div className="flex items-center mt-10">
          <h4 className="mr-10 font-bold">备份目录</h4>
          <div className="mr-5">{backupDirectory}</div>
          <button className="btn btn-sm" onClick={setBackupDirectoryFn}>
            更改目录
          </button>
        </div>
      </div>
    </div>
  )
}

export default GlobalSettings
