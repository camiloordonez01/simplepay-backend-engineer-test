import { Request, Response, NextFunction } from 'express'
import { logger, ResponseHandler } from '../../infrastructure/handler'

import { ValidateAnomaly, Stats } from '../../application/use_cases'

const file = 'validateAnomaly.controller.ts'
export const validateAnomaly = async (req: Request, _: Response, next: NextFunction) => {
    try {
        interface BodyInterface {
            dna: (string[])[]
        }
        const { dna }: BodyInterface = req.body

        next(new ResponseHandler(200, await ValidateAnomaly(dna)))
    } catch (error) {
        if (error instanceof Error) {
            logger.error({
                level: 'error',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

export const stats = async (__: Request, _: Response, next: NextFunction) => {
    try {
        next(new ResponseHandler(201, await Stats()))
    } catch (error) {
        if (error instanceof Error) {
            logger.error({
                level: 'error',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}

