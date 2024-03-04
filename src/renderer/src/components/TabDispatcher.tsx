import GameSettings from "./GameSettings"
import Records from "./Records"

const TabDispatcher = ({ props }) => {
  const { tab } = props
  console.log("tab: ", tab)
  let tabNode: React.ReactElement
  switch (tab) {
    case "records":
      tabNode = <Records props={props} key="records" />
      break
    case "gameSettings":
      tabNode = <GameSettings props={props} key="gameSettings" />
      break
    default:
      tabNode = <>Not supported by now.</>
      break
  }
  return <div className="m-2 p-2 text-zinc-600">{tabNode}</div>
}

export default TabDispatcher
