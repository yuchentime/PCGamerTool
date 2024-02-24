import { type } from 'os'
import React from 'react'

type Game = {
  id: string
  name: string
  thumbnail: string
}

const SideBar = ({ gameList }: { gameList: Game[] }) => {
  return (
    <div>
      <ul className="menu bg-base-200 w-56 rounded-box">
        {gameList.map((game) => (
          <li id={game.id}>
            <a>
              <svg
                xmlns={game.thumbnail}
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {game.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
