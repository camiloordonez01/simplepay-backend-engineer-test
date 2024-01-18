import { ResultEntity } from '../../domain/entities'
import { ResultRepository } from '../../domain/repositories'

import { ResultStorage } from '../../interfaces/storage/mysql'
import { ErrorHandler } from '../../infrastructure/handler'
import messages from '../../../messages'

const resultRepository = new ResultRepository(new ResultStorage())

export default async (dna: string[][]) => {
    const posicionValida = (i: number, j: number) => i>=0 && j>=0 && i<dna.length && j<dna[i].length

    let result = true
    for (let i = 0; i < dna.length; i++) {
        for (let j = 0; j < dna[i].length; j++) {
            if (
                (posicionValida(i + 1, j) &&
                    posicionValida(i + 2, j) &&
                    dna[i][j] === dna[i + 1][j] &&
                    dna[i][j] === dna[i + 2][j]) ||
                (posicionValida(i + 1, j + 1) &&
                    posicionValida(i + 2, j + 2) &&
                    dna[i][j] === dna[i + 1][j + 1] &&
                    dna[i][j] === dna[i + 2][j + 2]) ||
                (posicionValida(i, j + 1) &&
                    posicionValida(i, j + 2) &&
                    dna[i][j] === dna[i][j + 1] &&
                    dna[i][j] === dna[i][j + 2]) ||
                (posicionValida(i + 1, j - 1) &&
                    posicionValida(i + 2, j - 2) &&
                    dna[i][j] === dna[i + 1][j - 1] &&
                    dna[i][j] === dna[i + 2][j - 2]) ||
                (posicionValida(i, j - 1) &&
                    posicionValida(i, j - 2) &&
                    dna[i][j] === dna[i][j - 1] &&
                    dna[i][j] === dna[i][j - 2]) ||
                (posicionValida(i - 1, j - 1) &&
                    posicionValida(i - 2, j - 2) &&
                    dna[i][j] === dna[i - 1][j - 1] &&
                    dna[i][j] === dna[i - 2][j - 2]) ||
                (posicionValida(i - 1, j) &&
                    posicionValida(i - 2, j) &&
                    dna[i][j] === dna[i - 1][j] &&
                    dna[i][j] === dna[i - 2][j]) ||
                (posicionValida(i - 1, j + 1) &&
                    posicionValida(i - 2, j + 2) &&
                    dna[i][j] === dna[i - 1][j + 1] &&
                    dna[i][j] === dna[i - 2][j + 2])
            ) {
                result = false
            }
        }
    }

    const resultEntity = new ResultEntity({
        data:JSON.stringify(dna),
        result
    })
    await resultRepository.save(resultEntity)

    if (result) {
        throw new ErrorHandler(403, messages.NOT_ANOMALY)
    }
    return true
}
