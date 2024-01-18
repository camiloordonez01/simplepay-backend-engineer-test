/* eslint-disable no-underscore-dangle */
import { createResponse } from 'node-mocks-http'
import { describe, it, expect } from '@jest/globals'
import messages from '../../../../messages'

import {
    handleError,
    ErrorHandler,
    handleResponse,
    ResponseHandler
} from '..'

describe('Handlers', () => {
    it('handleError: Native error', async () => {
        const res = createResponse()
        handleError(new Error(messages.UNEXPECTED_ERROR), res)
        expect(JSON.parse(res._getData())).toEqual({
            ErrorMessage: messages.UNEXPECTED_ERROR,
        })
    })

    it('handleError: Error Handler', async () => {
        const res = createResponse()
        handleError(new ErrorHandler(400, messages.ERROR_NOT_FOUNT), res)
        expect(JSON.parse(res._getData())).toEqual({
            status: 'ERROR',
            statusCode: 400,
            message: messages.ERROR_NOT_FOUNT,
        })
    })

    it('handleError: Error Handler no message', async () => {
        const res = createResponse()
        handleError(new ErrorHandler(400, ''), res)
        expect(JSON.parse(res._getData())).toEqual({
            status: messages.HANDLE_ERROR,
            statusCode: 400,
            message: '',
        })
    })

    it('handleResponse: Response Handler', async () => {
        const res = createResponse()
        const data = new ResponseHandler(
            200,
            messages.UPDATE_SUCCESS
        )
        handleResponse(data, res, () => { })

        expect(JSON.parse(res._getData())).toEqual({
            result: messages.UPDATE_SUCCESS,
            status: messages.HANDLE_SUCCESS,
            statusCode: 200,
        })
    })

    it('handleResponse: Error Handler', async () => {
        const res = createResponse()
        handleResponse(
            new ErrorHandler(400, messages.ERROR_NOT_FOUNT),
            res,
            (info) => {
                handleError(info, res)
            }
        )

        expect(JSON.parse(res._getData())).toEqual({
            status: 'ERROR',
            statusCode: 400,
            message: messages.ERROR_NOT_FOUNT,
        })
    })

    it('handleResponse: object', async () => {
        const res = createResponse()
        const data = { injectedItem: true }
        handleResponse(data, res, () => { })
        expect(JSON.parse(res._getData())).toEqual({
            injectedItem: true,
        })
    })
})
