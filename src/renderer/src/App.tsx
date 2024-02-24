import React from 'react'
import electronLogo from './assets/electron.svg'
import Versions from './components/Versions'
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
  return (
    <>
      <div className="Sidebar"><SideBar/></div>
      <div className="Container"></div>
    </>
  )
}

export default App
