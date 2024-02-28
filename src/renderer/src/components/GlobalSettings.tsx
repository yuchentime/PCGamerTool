import React from "react"

const GlobalSettings = ({}) => {
  const [autoStatistics, setAutoStatistics] = React.useState(false)

  return (
    <>
      <div className="items-center text-zinc-600 m-2 p-2">
        {/* 每60s查询后台进程 */}
        <div className="flex ">
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
        <div className="flex ">
          <h4 className="mr-10 font-bold">每日游戏时长上限提醒</h4>
          <div className="mr-5">
            <input
              type="input"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalSettings
