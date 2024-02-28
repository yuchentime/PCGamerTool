import React from "react"
import { RiArrowGoBackFill } from "react-icons/ri"
import { FaFolderOpen } from "react-icons/fa"
import Alert from "./Alert"
const Records = ({ props }) => {
  const { gameId } = props
  const [saveRecords, setSaveRecords] = React.useState([])
  const [alert, setAlert] = React.useState(null)

  React.useEffect(() => {
    if (gameId) {
      // @ts-ignores
      window.api.getSaveRecords(gameId).then((records) => {
        if (records) {
          setSaveRecords(records)
        }
      })
    }
  }, [gameId])

  React.useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null)
      }, 1500)
    }
  }, [alert])

  const recoverySaveFile = (saveRecordsId: string) => {
    // @ts-ignores
    window.api.recoverySaveFile(gameId, saveRecordsId).then((res) => {
      if (res && res.code === 0) {
        setAlert({ msg: res.msg, alertType: "alert-success" })
      } else {
        setAlert({ msg: res.msg, alertType: "alert-error" })
      }
    })
  }

  return (
    <div>
      <div className="overflow-x-auto text-black">
        {alert && <Alert props={alert} />}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>存储路径</th>
              <th>创建时间</th>
              <th>备注</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {saveRecords.map((record) => {
              return (
                <tr key={record.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox checkbox-xs" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>{record.filePath}</div>
                    </div>
                  </td>
                  <td>{record.createdAt}</td>
                  <td>{record.comment}</td>
                  <th className="flex">
                    <div className="tooltip text-10 " data-tip="还原存档点">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => recoverySaveFile(record.id)}
                      >
                        <RiArrowGoBackFill />
                      </button>
                    </div>
                    <div className="tooltip text-10 " data-tip="打开备份目录">
                      <button className="btn btn-ghost btn-xs">
                        <FaFolderOpen />
                      </button>
                    </div>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Records
