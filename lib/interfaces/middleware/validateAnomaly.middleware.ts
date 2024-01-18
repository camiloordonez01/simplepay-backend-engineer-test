import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import { logger, ErrorHandler } from '../../infrastructure/handler'

import { validateMatrix } from '../../application/common/Utils.common'

import { validateRequired } from '../../../messages'

/**
 * Validate the information
 *
 * @author camilo.ordonez
 *
 */
const validateAnomaly = async (req: Request, _: Response, next: NextFunction) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            dna: Joi.array<(string[])[]>().required()
        })

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        }

        // validate request body against schema
        const { error } = schemaBody.validate(req.body, options)

        const messagesError: string[] = []
        error?.details.forEach((element) => {
            switch (element.context?.key) {
                case 'dna':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('dna'))
                    }
                    break
            }
        })

        if (!validateMatrix(req.body.dna)) {
            messagesError.push('Se espera una matriz matriz bidireccional con N cantidad de elementos. Ej. [["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"],["A", "B", "C", "D"]]')
        }

        if (messagesError.length > 0) {
            // on fail return comma separated errors
            throw new ErrorHandler(400, messagesError[0])
        }
        next()
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'validateAnomaly.middleware.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}
export default validateAnomaly
