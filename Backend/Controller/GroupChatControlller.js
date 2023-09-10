
const GroupChat = require('../Model/GroupChatModel')
const User = require("../Model/UserModel")

//getAllChats
exports.getGroupChats = async (req, res, next) => {
    let chats
    try{
        chats = await GroupChat.GroupModel.find()
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
exports.addGroupChats = async (req, res, next) => {
    let grpchat
    const {userId, userName, message} = req.body
    // let user
    // try{
    //     user = await User.userModel.findById(userId)
    // }
    // catch(err){
    //     return console.log(err)
    // }
    // if(!user){
    //     return res.status(404).json({message: "user not found"})
    // }

    try{
        grpchat = new GroupChat.GroupModel({
            userId,
            userName,
            message
        })
        grpchat = grpchat.save()
    }
    catch(err){
        console.log(err)
    }
    if(!grpchat){
        return res.status(409).json({message: "Couldn't send message"})
    }
    return res.status(200).json({message: "sent", grpchat})
}