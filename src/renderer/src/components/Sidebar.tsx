import React from 'react'

const SideBar = ({
  gameList,
  setActivedGameFn
}: {
  gameList: Game[]
  setActivedGameFn: (name) => void
}) => {
  const [activedGame, setActivedGame] = React.useState(gameList.length > 0 ? gameList[0].name : '')

  return (
    <div>
      <ul className="menu w-72 text-base-content">
        {gameList.map((game) => (
          <li key={game.name}>
            <a
              className={activedGame === game.name ? 'active' : ''}
              onClick={() => {
                setActivedGame(game.name)
                setActivedGameFn(game.name)
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
