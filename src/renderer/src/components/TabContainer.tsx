import React from "react"
import Container from "./Container"
import { useParams } from "react-router-dom"

const Dashboard = () => {
  const { gameId } = useParams()
  const [tabActive, setTabActive] = React.useState("records")
  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted">
        <a
          className={`tab ${tabActive === "records" && "tab-active"}`}
          onClick={() => setTabActive("records")}
        >
          存档记录
        </a>
        <a
          className={`tab ${tabActive === "notes" && "tab-active"}`}
          onClick={() => setTabActive("notes")}
        >
          游戏笔记
        </a>
        <a
          className={`tab ${tabActive === "satistics" && "tab-active"}`}
          onClick={() => setTabActive("satistics")}
        >
          统计时长
        </a>
        <a
          className={`tab ${tabActive === "settings" && "tab-active"}`}
          onClick={() => setTabActive("gameSettings")}
        >
          设置
        </a>
      </div>
      <Container key="container" props={{ tab: tabActive, gameId: gameId }} />
    </div>
  )
}

export default Dashboard
