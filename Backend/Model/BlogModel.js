
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    docId:{type: mongoose.Types.ObjectId,
        ref:"Doctor"},
    img:{type:String},
    docname:{type: String},    
    title: {type: String, required: true},
    content: {type: String, required: true}
})

exports.BlogModel = mongoose.model('Blog', blogSchema)

//blogs