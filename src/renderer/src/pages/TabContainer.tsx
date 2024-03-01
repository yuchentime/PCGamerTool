import React from "react"
import TabDispatcher from "../components/TabDispatcher"
import { useParams } from "react-router-dom"

const TabContainer = () => {
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
          className={`tab ${tabActive === "gameSettings" && "tab-active"}`}
          onClick={() => setTabActive("gameSettings")}
        >
          设置
        </a>
      </div>
      <TabDispatcher key="container" props={{ tab: tabActive, gameId: gameId }} />
    </div>
  )
}

export default TabContainer
