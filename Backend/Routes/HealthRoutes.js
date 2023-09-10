
const express = require('express')
const healthRouter = express.Router()
const healthController = require('../Controller/HealthController')


healthRouter
 .get('/', healthController.getHealthData)
 .get('/:id', healthController.getHealthDataById)
 .get('/similarUsers/:id', healthController.similarUsers)
 .post('/giveHealthData', healthController.postHealthData)

 exports.healthRouter = healthRouter
 