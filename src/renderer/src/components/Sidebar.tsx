import path from "path";
import React from "react";

const SideBar = ({
  gameList,
  selectedGame,
  setSelectedGameFn
}: {
  gameList: Game[]
  selectedGame: string
  setSelectedGameFn: (name) => void
}) => {

  const [localImg, setLocalImg] = React.useState('')

  React.useEffect(() => {
    // const imgPath = path.normalize(
    //   path.join(
    //     "file://C://Users//Administrator//AppData//Roaming//steam-source-manager//eldenring.jpg"
    //   )
    // )
    // setLocalImg(imgPath)
  }, [])

  return (
    <div>
      <ul className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <li key={game.name}>
            <a
              className={selectedGame === game.name ? "active" : ""}
              onClick={() => {
                setSelectedGameFn(game.name)
              }}
            >
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
        ))}
      </ul>
    </div>
  )
}

export default SideBar
