import { describe, it, expect, jest } from '@jest/globals'

import Stats from '../Stats'

jest.mock('../../common/Utils.common')
jest.mock('../../../interfaces/storage/mysql')

describe('Stats', () => {
    it('Estadísticas', async () => {
        const response = await Stats()
        expect(response).toEqual({
            "count_anomalies": 3,
            "count_no_anomalies": 2,
            "ratio": 0.6
        })
    })
})