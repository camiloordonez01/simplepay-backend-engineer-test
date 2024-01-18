import Entity from './Entity'

class ResultEntity extends Entity {
    resultId?: number
    data: string
    result: boolean

    constructor(resultEntity: ResultEntity) {
        super(resultEntity)
        this.resultId = resultEntity.resultId
        this.data = resultEntity.data
        this.result = resultEntity.result
    }
}

export default ResultEntity
