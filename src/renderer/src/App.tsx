import React from 'react'
import SideBar from './components/Sidebar'
import Container from './components/Container'

function App(): JSX.Element {
  const [tabActive, setTabActive] = React.useState('records')
  const setOriginalFile = async () => {
    const filePath = await window.electron.ipcRenderer.invoke('setOrinalFilePath', 'Elden Ring')
  }
  const ipcHandleSave = async () => {
    const res = await window.electron.ipcRenderer.invoke('saveFile', 'Elden Ring')
    console.log(res)
  }

  const gameList = [
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

  return (
    <div className="flex h-screen w-screen border-t border-gray-200 p-1">
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
        <Container key="container" props={{ tab: tabActive }} />
      </div>
    </div>
  )
}

export default App
