
const express = require("express")
const oneChatRouter = express.Router()

const One2OneController = require('../Controller/One2OneContoller')

oneChatRouter
.get('/', One2OneController.getAllMessages)
.get('/:senderId/:receiverId', One2OneController.getOne2Messages)
.post('/send', One2OneController.SendMessage)

exports.oneChatRouter = oneChatRouter