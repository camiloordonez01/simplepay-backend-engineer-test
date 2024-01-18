import { ResultStorage } from '../../interfaces/storage/mysql'
import Repository from './Repository'

class ResultRepository extends Repository {
    protected storage: ResultStorage
    constructor(resultStorage: ResultStorage) {
        super(resultStorage)
        this.storage = resultStorage
    }

    getStats() {
        return this.storage.getStats()
    } 
}

export default ResultRepository
