const express = require('express')
const userRouter  =express.Router()
const userController = require('../Controller/UserController')

userRouter
.get('/', userController.getAllUsers)
.get('/:id',userController.getUserDetailsById)
.post("/signup", userController.userSignup)
.post('/login', userController.userLogin)
.patch('/addDetails/:id', userController.addMoreDetails)

exports.userRouter = userRouter 