import Records from './Records'
import Settings from './Settings'

const Container = ({ props }) => {
  const { tab } = props
  console.log('tab: ', tab)
  let tabNode: React.ReactElement
  switch (tab) {
    case 'records':
      tabNode = <Records props={props} />
      break
    case 'settings':
      tabNode = <Settings props={props} />
      break
    default:
      tabNode = <>错误</>
      break
  }
  return <div className="m-2 p-2 text-zinc-600">{tabNode}</div>
}

export default Container
