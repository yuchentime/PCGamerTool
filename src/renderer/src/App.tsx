import { info } from "electron-log"
import React from "react"
import { Outlet, useNavigate } from "react-router"
import useSlicenceHook from "./hooks/useSlicenceHook"
import SideBar from "./pages/Sidebar"

function App(): JSX.Element {
  const navigate = useNavigate()

  React.useEffect(() => {
    info("rendering App")
    window.electron.ipcRenderer.on("openSetting", () => {
      info("openSetting")
      navigate("/settings")
    })

    window.electron.ipcRenderer.on("notification", (_, title) => {
      useSlicenceHook("lastNotificationTime", () => {
        new window.Notification(String(title), { body: "" })
      })
    })
  }, [])

  return (
    <div className="flex h-screen w-screen border-t border-gray-200 p-1">
      <div className="border-r border-gray-200 px-1 pt-10 w-72 flex justify-center item-center">
        <SideBar key="sideBar" />
      </div>
      <div className="flex-1 p-1">
        <Outlet />
      </div>
    </div>
  )
}

export default App
