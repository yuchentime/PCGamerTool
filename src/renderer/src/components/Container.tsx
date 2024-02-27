import GameSettings from './GameSettings'
import Records from './Records'

const Container = ({ props }) => {
  const { tab } = props
  console.log('tab: ', tab)
  let tabNode: React.ReactElement
  switch (tab) {
    case 'records':
      tabNode = <Records props={props} />
      break
    case 'gameSettings':
      tabNode = <GameSettings props={props} />
      break
    default:
      tabNode = <>Error page, please contact the developer.</>
      break
  }
  return <div className="m-2 p-2 text-zinc-600">{tabNode}</div>
}

export default Container
