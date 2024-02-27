import React from 'react'

const SideBar = ({
  gameList,
  selectedGame,
  setSelectedGameFn
}: {
  gameList: Game[]
  selectedGame: string
  setSelectedGameFn: (name) => void
}) => {
  return (
    <div>
      <ul className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <li key={game.name}>
            <a
              className={selectedGame === game.name ? 'active' : ''}
              onClick={() => {
                setSelectedGameFn(game.name)
              }}
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
