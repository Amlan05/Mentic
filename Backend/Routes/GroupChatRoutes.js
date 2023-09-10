
const express = require('express')
const groupChatRouter = express.Router()
const groupChatController = require('../Controller/GroupChatControlller')

groupChatRouter
 .get('/', groupChatController.getGroupChats)
.post('/add' ,groupChatController.addGroupChats)

exports.groupChatRouter = groupChatRouter