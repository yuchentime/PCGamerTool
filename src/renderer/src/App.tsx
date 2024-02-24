import React from 'react'
import electronLogo from './assets/electron.svg'
import Versions from './components/Versions'

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
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <input type="text" value={file} readOnly />
          <a target="_blank" rel="noreferrer" onClick={setOriginalFile}>
            选择存档文件位置
          </a>
          <a target="_blank" rel="noreferrer" onClick={ipcHandleSave}>
            存档
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
