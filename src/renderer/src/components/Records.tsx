import React from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri'

const Records = ({ props }) => {
  const { gameId } = props
  const [saveRecords, setSaveRecords] = React.useState([])
  const [toast, setToast] = React.useState(false)

  React.useEffect(() => {
    if (gameId) {
      // @ts-ignores
      window.api.getSaveRecords(gameId).then((records) => {
        if (records) {
          setSaveRecords(records)
        }
      })
    }
  }, [])

  const recoverySaveFile = (saveRecordsId: string) => {
    // @ts-ignores
    window.api.recoverySaveFile(gameId, saveRecordsId).then((res) => {
      if (res && res.code === 0) {
        setToast(true)
      } else {
      }
    })
  }

  return (
    <div>
      {toast && (
        <div className="toast toast-top toast-center top-24 z-10">
          <div className="alert alert-info">
            <span>操作成功！</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto text-black">
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
                  <th>
                    <div className="tooltip text-10" data-tip="还原存档点">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => recoverySaveFile(record.id)}
                      >
                        <RiArrowGoBackFill />
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
