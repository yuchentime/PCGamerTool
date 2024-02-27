import React from 'react'

const GlobalSettings = ({ }) => {

  const [autoStatistics, setAutoStatistics] = React.useState(false)

  return (
    <>
      <div className="flex items-center text-zinc-600 m-2 p-2">
        <h4 className="mr-10 font-bold">自动统计游戏时长</h4>
        <div className="mr-5">
          <input
            type="checkbox"
            className="toggle"
            checked={autoStatistics}
            onChange={() => setAutoStatistics(!autoStatistics)}
          />
        </div>
      </div>
    </>
  )
}

export default GlobalSettings
