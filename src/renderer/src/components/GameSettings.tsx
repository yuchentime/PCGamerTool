import React from 'react'

const GameSettings = ({ props }) => {
  const { gameId } = props

  const [originalFilePosition, setOriginalFilePosition] = React.useState('')

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

  return (
    <>
      <div className="flex items-center">
        <h4 className="mr-10 font-bold">源存档文件</h4>
        <div className="mr-5">{originalFilePosition}</div>
        <button className="btn btn-sm" onClick={setOriginalFilePositionFn}>
          更改地址
        </button>
      </div>
    </>
  )
}

export default GameSettings
