import IconImage from "@renderer/components/IconImage"
import RightClickMenu from "@renderer/components/RightClickMenu"
import path from "path-browserify"
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

const SideBar = () => {
  const [gameList, setGameList] = React.useState<Game[]>([])
  const [selectedGame, setSelectedGame] = React.useState("")
  const [contextMenuProps, setContextMenuProps] = React.useState({})
  const navigate = useNavigate()

  React.useEffect(() => {
    updateGameList().then((games) => {
      setGameList(games)
      if (games.length > 0) {
        navigate(`/${games[0].name}`)
      }
    })

    window.electron.ipcRenderer.on("updateGameList", () => {
      updateGameList().then((games) => {
        setGameList(games)
      })
    })

    const handleClick = () => {
      setContextMenuProps({ visiable: false })
    }

    document.addEventListener("click", handleClick)

    // To prevent the Memory Leak
    return () => {
      document.removeEventListener("click", handleClick)
      window.electron.ipcRenderer.removeAllListeners("updateGameList")
    }
  }, [])

  const updateGameList = (): Promise<Game[]> => {
    return new Promise((resolve) => {
      // @ts-ignores
      window.api
        .getGameList()
        .then((games) => {
          if (games && games.length > 0) {
            resolve(games)
          } else {
            resolve([])
          }
        })
        .catch((e) => {
          console.error(e)
          resolve([])
        })
    })
  }

  const handleRightClickMenu = (e: React.MouseEvent, gameId: string) => {
    e.preventDefault()
    const contextMenuTop = e.currentTarget.clientHeight + e.currentTarget.offsetTop - 10
    setContextMenuProps({ x: e.clientX, y: contextMenuTop, gameId: gameId, visiable: true })
  }

  return (
    <div className="flex">
      <ul id="gameList" className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <NavLink to={`/${game.name}`}>
            <li
              key={game.name}
              onClick={() => setSelectedGame(game.name)}
              onContextMenu={(event) => handleRightClickMenu(event, game.name)}
            >
              <a className={selectedGame === game.name ? "active" : ""}>
                <div className="avatar">
                  <div className="w-8 rounded">
                    {game.thumbnail && <IconImage src={path.join("file://", game.thumbnail)} />}
                  </div>
                </div>
                {game.name}
              </a>
            </li>
          </NavLink>
        ))}
      </ul>
      {contextMenuProps?.visiable && <RightClickMenu props={{ ...contextMenuProps }} />}
    </div>
  )
}

export default SideBar
