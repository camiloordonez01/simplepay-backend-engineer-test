import { describe, it, expect, jest } from '@jest/globals'
import messages from '../../../../messages'

import ValidateAnomaly from '../ValidateAnomaly'

jest.mock('../../common/Utils.common')
jest.mock('../../../interfaces/storage/mysql')

describe('ValidateAnomaly', () => {
    it('Se encontró anomalías', async () => {
        const response = await ValidateAnomaly([
            ['B', 'B', 'C', 'D', 'E'],
            ['A', 'A', 'A', 'D', 'D'],
            ['B', 'A', 'D', 'A', 'E'],
            ['A', 'B', 'C', 'D', 'A'],
            ['B', 'A', 'C', 'D', 'E'],
        ])
        expect(response).toEqual(true)
    })
    it('No se encontró anomalías', async () => {
        expect(ValidateAnomaly([
            ['B', 'B', 'C', 'D', 'E'],
            ['A', 'A', 'B', 'D', 'D'],
            ['B', 'A', 'D', 'A', 'E'],
            ['A', 'B', 'C', 'D', 'A'],
            ['B', 'A', 'C', 'D', 'E'],
        ])).rejects.toThrow(messages.NOT_ANOMALY)
    })
})
