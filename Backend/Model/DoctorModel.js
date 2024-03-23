
const mongoose = require("mongoose")
const Schema = mongoose.Schema

DoctorSchema = new Schema( {
    name: {type:String, required: true},
    email: {type:String, required:true},
    password: {type: String, required: true},
    specialization: {type: String, required: true},
    status: {type: String}
})

exports.DoctorModel = mongoose.model("Doctor", DoctorSchema)
//doctors