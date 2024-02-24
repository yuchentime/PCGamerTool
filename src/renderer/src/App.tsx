import React from 'react'
import SideBar from './components/Sidebar'

function App(): JSX.Element {
  const [file, setFile] = React.useState('')
  const setOriginalFile = async () => {
    const filePath = await window.electron.ipcRenderer.invoke('setOrinalFilePath', 'Elden Ring')
    setFile(filePath)
  }
  const ipcHandleSave = async () => {
    const res = await window.electron.ipcRenderer.invoke('saveFile', 'Elden Ring')
    console.log(res)
  }

  const gameList = [
    {
      id: '1001',
      name: 'Elden Ring',
      thumbnail: 'http://www.w3.org/2000/svg'
    }
  ]

  return (
    <>
      <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        Button
      </button>
      <div className="Sidebar">
        <SideBar gameList={gameList} />
      </div>
      <div className="Container"></div>
    </>
  )
}

export default App
