import Records from "./Records"

const Container = ({props}) => {
  const {tab} = props
  switch (tab) {
    case 'records':
      return <Records props={props}/>
    default:
      return <Records props={props}/>
  }
}

export default Container
