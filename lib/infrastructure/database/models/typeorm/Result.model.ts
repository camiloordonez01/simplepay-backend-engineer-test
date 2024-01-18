import { Column, Entity, PrimaryGeneratedColumn,  } from 'typeorm'
import Model from '../../Model'

@Entity('tbl_results')
class ResultModel extends Model {
    @PrimaryGeneratedColumn({ name: 'result_id' })
    resultId?: number

    @Column()
    data: string

    @Column()
    result: boolean

    constructor(
        data: string,
        result: boolean,
        resultId?: number,
    ) {
        super()
        this.resultId = resultId
        this.data = data
        this.result = result
    }
}

export default ResultModel
