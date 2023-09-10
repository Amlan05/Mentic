
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const One2OneSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      }
})

exports.One2OneModel = mongoose.model("Personal", One2OneSchema)

//personals