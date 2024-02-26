import React from 'react'
import Container from './components/Container'
import SideBar from './components/Sidebar'

function App(): JSX.Element {
  const [tabActive, setTabActive] = React.useState('records')
  const [toast, setToast] = React.useState(false)
  const [gameList, setGameList] = React.useState<Game[]>([])
  const [selectedGameId, setSelectedGameId] = React.useState('')

  React.useEffect(() => {
    const games = [
      {
        id: '1001',
        name: 'Elden Ring',
        thumbnail: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
      },
      {
        id: '1002',
        name: 'Nioh 2',
        thumbnail: 'http://img1.gamersky.com/image2020/04/20200423_syj_380_3/image003.jpg'
      }
    ]
    setGameList(games)

    if (games.length > 0) {
      setSelectedGameId(games[0].id)
    }
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      setToast(false)
    }, 1500)
  }, [toast])

  return (
    <div className="flex h-screen w-screen border-t border-gray-200 p-1">
      {toast && (
        <div className="toast toast-top toast-center top-24 z-10">
          <div className="alert alert-info">
            <span>操作成功！</span>
          </div>
        </div>
      )}

      <div className="border-r border-gray-200 px-1 pt-10 w-72 flex justify-center item-center">
        <SideBar key="sideBar" gameList={gameList} />
      </div>
      <div className="flex-1">
        <div className="p-1">
          <div role="tablist" className="tabs tabs-lifted">
            <a
              role="records"
              className={`tab ${tabActive === 'records' && 'tab-active'}`}
              onClick={() => setTabActive('records')}
            >
              存档记录
            </a>
            <a
              role="notes"
              className={`tab ${tabActive === 'notes' && 'tab-active'}`}
              onClick={() => setTabActive('notes')}
            >
              游戏笔记
            </a>
            <a
              role="satistics"
              className={`tab ${tabActive === 'satistics' && 'tab-active'}`}
              onClick={() => setTabActive('satistics')}
            >
              统计时长
            </a>
            <a
              role="settings"
              className={`tab ${tabActive === 'settings' && 'tab-active'}`}
              onClick={() => setTabActive('settings')}
            >
              设置
            </a>
          </div>
        </div>
        <Container key="container" props={{ tab: tabActive, gameId: selectedGameId }} />
      </div>
    </div>
  )
}

export default App
