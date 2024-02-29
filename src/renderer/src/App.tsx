import React from "react"
import { Outlet } from "react-router"
import GlobalSettings from "./components/GlobalSettings"
import SideBar from "./components/Sidebar"

function App(): JSX.Element {
  const [openGlobalSettings, setOpenGlobalSettings] = React.useState(false)

  React.useEffect(() => {
    window.electron.ipcRenderer.on("openSetting", () => {
      setOpenGlobalSettings(true)
    })

    window.electron.ipcRenderer.on("notification", (_, title) => {
      new window.Notification(String(title), { body: "" })
    })
  }, [])

  return (
    <div className="flex h-screen w-screen border-t border-gray-200 p-1">
      <div className="border-r border-gray-200 px-1 pt-10 w-72 flex justify-center item-center">
        <SideBar key="sideBar" />
      </div>
      <div className="flex-1 p-1">{openGlobalSettings ? <GlobalSettings /> : <Outlet />}</div>
    </div>
  )
}

export default App
