import path from "path"
import { NavLink } from "react-router-dom"
import React from "react"

const SideBar = () => {
  const [gameList, setGameList] = React.useState<Game[]>([])
  const [selectedGame, setSelectedGame] = React.useState("")

  React.useEffect(() => {
    updateGameList()

    window.electron.ipcRenderer.on("updateGameList", () => {
      updateGameList()
    })

  }, [])

  const updateGameList = async () => {
    // @ts-ignores
    window.api.getGameList().then((games) => {
      if (games && games.length > 0) {
        setGameList(games)
      }
    })
  }

  return (
    <div>
      <ul className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <NavLink to={`/${game.name}`}>
            <li key={game.name} onClick={() => setSelectedGame(game.name)}>
              <a className={selectedGame === game.name ? "active" : ""}>
                <div className="avatar">
                  <div className="w-8 rounded">
                    <img
                      src="file://C://Users//Administrator//AppData//Roaming//steam-source-manager//eldenring.jpg"
                      alt={game.name}
                    />
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
