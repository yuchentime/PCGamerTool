import React from 'react'

type Game = {
  id: string
  name: string
  thumbnail: string
}

const SideBar = ({ gameList }: { gameList: Game[] }) => {
  const [activeId, setActiveId] = React.useState(gameList.length > 0 ? gameList[0].id : '')
  return (
    <div>
      <ul className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <li key={game.id}>
            <a
              className={activeId === game.id ? 'active' : ''}
              onClick={() => setActiveId(game.id)}
            >
              {/* <div className="avatar">
                <div className="w-8 rounded">
                  <img
                    src={game.thumbnail}
                    alt={game.name}
                  />
                </div>
              </div> */}
              {game.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
