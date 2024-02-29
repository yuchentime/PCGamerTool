import React from "react"
import { FaFolderOpen } from "react-icons/fa"
import { RiArrowGoBackFill } from "react-icons/ri"
import Alert from "./Alert"
const Records = ({ props }) => {
  const { gameId } = props
  const [saveRecords, setSaveRecords] = React.useState<SaveRecord[]>([])
  const [recordList, setRecordList] = React.useState<SaveRecord[]>([])
  const [alert, setAlert] = React.useState<Alert | null>(null)

  const size = 10
  const [page, setPage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(1)

  React.useEffect(() => {
    console.count("query records by " + gameId)
    if (gameId) {
      // @ts-ignores
      window.api.getSaveRecords(gameId).then((records) => {
        if (records) {
          records.sort((a, b) => b.createdAt - a.createdAt)
          setSaveRecords(records)
          setRecordList(records.slice(0, size))
          setTotalPage(Math.ceil(records.length / size))
        }
      })
    }
  }, [gameId])

  React.useEffect(() => {
    setRecordList(saveRecords.slice((page - 1) * size, page * size))
  }, [page])

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
      <div className="overflow-x-auto text-black flex-1">
        {alert && <Alert props={alert} />}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>存储路径</th>
              <th>备注</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recordList.map((record) => {
              return (
                <tr key={record.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox checkbox-xs" />
                    </label>
                  </th>
                  <td>
                    {record.filePath}
                  </td>
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
      <div className="w-full flex justify-end m-2">
        <div className="join">
          {Array.from({ length: totalPage }).map((_, index) => (
            <button
              className={`join-item btn btn-sm ${page === index + 1 ? "btn-active" : ""}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Records
