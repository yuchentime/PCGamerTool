import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router"
const GlobalSettings = ({}) => {
  const navigate = useNavigate()
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
    navigate(-1)
  }

  return (
    <div className="flex">
      <div className="items-center text-zinc-600 m-2 p-2">
        <IoArrowBack className="cursor-pointer" size={20} onClick={toBack} />
        <div className="flex item-center mt-10">
          <h4 className="mr-10 font-bold">每日游戏上限时长</h4>
          <div className="mr-5">
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full input-sm"
            />
          </div>
          <div>剩余30/60</div>
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
