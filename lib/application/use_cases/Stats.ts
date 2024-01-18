import { ResultRepository } from '../../domain/repositories'

import { ResultStorage } from '../../interfaces/storage/mysql'

const resultRepository = new ResultRepository(new ResultStorage())

export default async () => {
    const { countAnomalies, countNoAnomalies } = await resultRepository.getStats()

    return {
        count_anomalies: countAnomalies,
        count_no_anomalies: countNoAnomalies,
        ratio: countAnomalies / (countAnomalies + countNoAnomalies),
    }
}
