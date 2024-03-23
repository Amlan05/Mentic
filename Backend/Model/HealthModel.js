
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const healthSchema = new Schema( {
    userid:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    primarycondition:{type: String, required: true},
    secondarycondition: {type: String},
    detailedreason: {type: String}, 
    keywords: {type: [String]}
})


exports.healthModel = mongoose.model('Health', healthSchema)

//healths