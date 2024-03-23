
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OneChatSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    message: {type: String, required: true}
})

exports.OneModel = mongoose.model("Onechat", OneChatSchema)