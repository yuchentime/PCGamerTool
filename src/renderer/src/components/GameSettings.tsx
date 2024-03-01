import React from "react"

const GameSettings = ({ props }) => {
  const { gameId } = props

  const [originalFilePosition, setOriginalFilePosition] = React.useState("")

  React.useEffect(() => {
    // @ts-ignores
    window.api.getGameSettings(gameId).then((properties) => {
      if (properties) {
        setOriginalFilePosition(properties.originalFilePath)
      }
    })
  }, [gameId])

  const setOriginalFilePositionFn = async () => {
    // @ts-ignores
    window.api.setOrinalFilePath(gameId).then((filePath) => {
      setOriginalFilePosition(filePath)
    })
  }

  const startGame = () => {
    // @ts-ignores
    window.api.startGame(gameId)
  }

  return (
    <>
      <div className="flex items-center mt-10">
        <h4 className="mr-10 font-bold">源存档文件</h4>
        <div className="mr-5">{originalFilePosition}</div>
        <button className="btn btn-sm" onClick={setOriginalFilePositionFn}>
          更改地址
        </button>
      </div>
      <button className="btn btn-sm mt-10" onClick={startGame}>
        打开游戏
      </button>
    </>
  )
}

export default GameSettings
