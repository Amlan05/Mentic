
const Doctor = require("../Model/DoctorModel")
const bcrypt = require('bcrypt')

//SIGNUP
exports.doctorSignup = async (req, res, next) => {
    let newDoctor
    const {name, email, password, specialization, status} = req.body
    const securePassword = bcrypt.hashSync(password, 10)
    try{
        newDoctor = new Doctor.DoctorModel({
            name,
            email,
            password: securePassword,
            specialization,
            status
        })
        newDoctor = await newDoctor.save()
    }
    catch(err){
        return console.log(err)
    }
    if(!newDoctor){
        return res.status(409).json({message: "Error occured"})
    }
    return res.status(200).json({message: "Account successfully created", newDoctor})
}

//LOGIN
exports.doctorLogin = async (req, res, json) => {
    const {email, password} = req.body
    let existingDoctor
    try{
        existingDoctor = await Doctor.DoctorModel.findOne({email})
    }
    catch(err){
       return  console.log(err)
    }
    if(!existingDoctor){
        return res.status(404).json("message: No account found")
    }
    isPasswordCorrect = bcrypt.compareSync(password, existingDoctor.password)
    if(!isPasswordCorrect){
        return res.status(401).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: "Successfully LoggedIn", existingDoctor})
}

//GETALLDOCTORS
exports.getAllDoctors = async (req, res, next) => {
    let doctors
    try{
        doctors = await Doctor.DoctorModel.find()
    }
    catch(err){
        return console.log(err)
    }
    if(!doctors){
        return res.status(404).json({message: "Error Occured"})
    }
    return res.status(200).json({doctors})
}

//GetDoctorDetailsById
exports.getDetailsById = async(req, res, next) => {
    let doctorData
    const id = req.params.id
    try{
        doctorData = await Doctor.DoctorModel.findById({_id: id})
    }
    catch(err){
        return console.log(err)
    }
    if(!doctorData){
        return res.status(404).json({message: "Doctor details not found"})
    }
    return res.status(200).json({doctorData})
}