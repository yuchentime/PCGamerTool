import { RECORDS_PREFIX } from "../constants/SettinsConstant"
import Stores from '../store/index'

const RecordsHandler = {
  getSaveRecords: (gameId: string) => {
    return Stores.games.get(RECORDS_PREFIX + gameId) || []
  }
}
export default RecordsHandler

