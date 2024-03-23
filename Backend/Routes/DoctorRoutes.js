
const express = require('express')
const doctorRouter = express.Router()
const doctorController  =require('../Controller/DoctorController')

doctorRouter
.get('/', doctorController.getAllDoctors)
.get('/:id', doctorController.getDetailsById)
.post('/signup', doctorController.doctorSignup)
.post('/login', doctorController.doctorLogin)

exports.doctorRouter = doctorRouter
