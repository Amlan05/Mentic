
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupChatSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    userName:{type:String, required: true},
    message: {type: String}
})

exports.GroupModel = mongoose.model("Groupchat", GroupChatSchema)