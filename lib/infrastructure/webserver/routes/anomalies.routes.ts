import express from 'express'

import { ValidateAnomalyMiddleware } from '../../../interfaces/middleware'
import { validateAnomaly, stats } from '../../../interfaces/controllers/validateAnomaly.controller'

const AnomaliesRouter = express.Router()

// Validates if there is an anomaly in the DNA
AnomaliesRouter.post('/validate-anomaly', ValidateAnomalyMiddleware, validateAnomaly)
AnomaliesRouter.get('/stats', stats)

export default AnomaliesRouter