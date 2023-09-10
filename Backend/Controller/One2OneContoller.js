
const One2One = require("../Model/One2OneModel")

//SEND_MESSAGE

exports.SendMessage = async(req, res, next) => {
    let msg
    const {sender, receiver, content} = req.body
    try{
        msg  = new One2One.One2OneModel({
            senderId: sender,
            receiverId: receiver,
            content: content
        })
        msg = msg.save()
    }
    catch(err){
        return console.log(err)
    }
    if(!msg){
        return res.status(409).json({message: "Could send message"})
    }
    return res.status(200).json({message: "sent successfully", msg})
}

//GET MESSAGES
exports.getOne2Messages = async(req, res,  next) => {
    let msgs
    const {id1, id2} = req.params
    try{
        msgs = await One2One.One2OneModel.find({
            senderId: id1,
            receiverId: id2
        })
    }
    catch(err){
        return console.log(err)
    }
    if(!msgs){
        return res.status(404).json({message: "No chats found"})
    }
    return res.status(200).json({msgs})
}

//GETALLMESSAGES

exports.getAllMessages = async(req, res, next) => {
    let msgs
    try{
        msgs = await One2One.One2OneModel.find()
    }
    catch(err){
        return console.log(err)
    }
    if(!msgs){
        return res.status(404).json({message: "No chats found"})
    }
    return res.status(200).json({msgs})
}