import IconImage from "@renderer/components/IconImage"
import path from "path-browserify"
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

const SideBar = () => {
  const [gameList, setGameList] = React.useState<Game[]>([])
  const [selectedGame, setSelectedGame] = React.useState("")
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

  return (
    <div>
      <ul className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <NavLink to={`/${game.name}`} key={game.name}>
            <li key={game.name} onClick={() => setSelectedGame(game.name)}>
              <a className={selectedGame === game.name ? "active" : ""}>
                <div className="avatar">
                  <div className="w-8 rounded">
                    <IconImage src={path.join("file://", game.thumbnail)} />
                  </div>
                </div>
                {game.name}
              </a>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
