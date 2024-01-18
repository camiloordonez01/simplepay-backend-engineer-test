import StorageMysql from '../StorageMysql'

import { ResultModel } from '../../../infrastructure/database/models/typeorm'

class ResultStorage extends StorageMysql {
    constructor() {
        super(ResultModel)
    }

    async getStats() {
        const countAnomalies = await this.repository.countBy({ result: 1 })
        const countNoAnomalies = await this.repository.countBy({ result: 0 })

        return { countAnomalies, countNoAnomalies }
    }
}

export default ResultStorage
