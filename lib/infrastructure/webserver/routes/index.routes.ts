import express from 'express'

import AnomaliesRouter from './anomalies.routes'

const RouterMain = express.Router()

RouterMain.use('/', AnomaliesRouter)

export default RouterMain
