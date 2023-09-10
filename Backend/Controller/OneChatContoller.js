

const OneChat = require('../Model/OneChatModel')

//getAllChats
exports.getOneChats = async (req, res, next) => {
    let chats
    try{
        chats = await OneChat.OneModel.find()
    }
    catch(err){
        console.log(err)
    }
    if(!chats){
        return res.status(404).json({message: "No chats found"})
    }
    return res.status(200).json({chats})
}

//sendMessageInGroup
exports.addOneChats = async (req, res, next) => {
    let oneChat
    const {userId, message} = req.body
    try{
        oneChat = new OneChat.OneModel({
            userId,
            message
        })
        oneChat = oneChat.save()
    }
    catch(err){
        console.log(err)
    }
    if(!oneChat){
        return res.status(409).json({message: "Couldn't send message"})
    }
    return res.status(200).json({message: "sent", oneChat})
}