import React from "react"
import Container from "./components/Container"
import SideBar from "./components/Sidebar"
import GlobalSettings from "./components/GlobalSettings"

function App(): JSX.Element {
  const [tabActive, setTabActive] = React.useState("records")
  const [openGlobalSettings, setOpenGlobalSettings] = React.useState(false)
  const [gameList, setGameList] = React.useState<Game[]>([])
  const [selectedGame, setSelectedGame] = React.useState("")

  React.useEffect(() => {
    updateGameList()

    window.electron.ipcRenderer.on("updateGameList", () => {
      updateGameList()
    })

    window.electron.ipcRenderer.on("openSetting", () => {
      setOpenGlobalSettings(true)
    })

    window.electron.ipcRenderer.on("notification", (_, title) => {
      new window.Notification(String(title), { body: "" })
    })
  }, [])

  const updateGameList = async () => {
    // @ts-ignores
    window.api.getGameList().then((games) => {
      if (games && games.length > 0) {
        setGameList(games)
        if (!selectedGame || selectedGame === "") {
          setSelectedGame(games[0].name)
        }
      }
    })
  }

  return (
    <div className="flex h-screen w-screen border-t border-gray-200 p-1">
      <div className="border-r border-gray-200 px-1 pt-10 w-72 flex justify-center item-center">
        <SideBar
          key="sideBar"
          gameList={gameList}
          selectedGame={selectedGame}
          setSelectedGameFn={(name) => {
            setSelectedGame(name)
            setOpenGlobalSettings(false)
          }}
        />
      </div>
      <div className="flex-1">
        <div className="p-1">
          {openGlobalSettings ? (
            <GlobalSettings />
          ) : (
            <>
              <div role="tablist" className="tabs tabs-lifted">
                <a
                  className={`tab ${tabActive === "records" && "tab-active"}`}
                  onClick={() => setTabActive("records")}
                >
                  存档记录
                </a>
                <a
                  className={`tab ${tabActive === "notes" && "tab-active"}`}
                  onClick={() => setTabActive("notes")}
                >
                  游戏笔记
                </a>
                <a
                  className={`tab ${tabActive === "satistics" && "tab-active"}`}
                  onClick={() => setTabActive("satistics")}
                >
                  统计时长
                </a>
                <a
                  className={`tab ${tabActive === "settings" && "tab-active"}`}
                  onClick={() => setTabActive("gameSettings")}
                >
                  设置
                </a>
              </div>
              <Container key="container" props={{ tab: tabActive, gameId: selectedGame }} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
