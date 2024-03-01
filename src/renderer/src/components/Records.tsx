import { formateDate } from "@renderer/util/date"
import React from "react"
import { FaFolderOpen } from "react-icons/fa"
import { RiArrowGoBackFill } from "react-icons/ri"
import Alert from "./Alert"

const Records = ({ props }) => {
  const { gameId } = props
  const [allSaveRecords, setAllSaveRecords] = React.useState<SaveRecord[]>([])
  const [currentPageRecords, setCurrentPageRecords] = React.useState<SaveRecord[]>([])
  const [alert, setAlert] = React.useState<Alert | null>(null)

  const commentDialogRef = React.useRef(null)
  const [dialogComment, setDialogComment] = React.useState("")
  const [dialogRecordId, setDialogRecordId] = React.useState("")
  const saveComment = () => {
    // @ts-ignores
    window.api.saveComment(gameId, dialogRecordId, dialogComment).then((response) => {
      if (response && response.code === 0) {
        setDialogComment("")
        setCurrentPageRecords(
          currentPageRecords.map((record) => {
            if (record.id === dialogRecordId) {
              record.comment = dialogComment
            }
            return record
          })
        )
        setAllSaveRecords(
          allSaveRecords.map((record) => {
            if (record.id === dialogRecordId) {
              record.comment = dialogComment
            }
            return record
          })
        )
      } else {
        setAlert({
          msg: response.msg,
          alertType: "alert-warning"
        })
      }
    })
  }

  const openSaveFileFolder = (saveRecordId: string) => {
    // @ts-ignores
    window.api.openSaveFileFolder(gameId, saveRecordId).then((response) => {
      if (!response || response.code !== 0) {
        setAlert({
          msg: response.msg,
          alertType: "alert-warning"
        })
      }
    })
  }

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
          setAllSaveRecords(records)
          setCurrentPageRecords(records.slice(0, size))
          setTotalPage(Math.ceil(records.length / size))
        }
      })
    }
  }, [gameId])

  React.useEffect(() => {
    setCurrentPageRecords(allSaveRecords.slice((page - 1) * size, page * size))
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
              <th>创建时间</th>
              <th>备注</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPageRecords.map((record) => {
              return (
                <tr key={record.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox checkbox-xs" />
                    </label>
                  </th>
                  <td>{formateDate(record.createdAt)}</td>
                  <td className="min-w-20 max-w-64">
                    <div
                      className="w-full cursor-pointer :hover:text-blue"
                      onClick={() => {
                        if (commentDialogRef?.current) {
                          commentDialogRef.current.showModal()
                          setDialogComment(record.comment)
                          setDialogRecordId(record.id)
                        }
                      }}
                    >
                      {record.comment || (
                        <div className="text-gray-300">
                          <i>点击添加备注</i>
                        </div>
                      )}
                    </div>
                  </td>
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
                      <button className="btn btn-ghost btn-xs" onClick={() => openSaveFileFolder(record.id)}>
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

      <dialog id="modify_comment" className="modal" ref={commentDialogRef}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">添加备注</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={dialogComment}
            onChange={(e) => setDialogComment(e.target.value)}
            onBlur={saveComment}
          />
        </div>
      </dialog>
    </div>
  )
}

export default Records
