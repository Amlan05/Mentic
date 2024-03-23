const User = require("../Model/UserModel");
const bcrypt = require('bcrypt')

//Signup
exports.userSignup = async (req, res, next) => {

  const { name, email, password } = req.body;
  const securedPassword = bcrypt.hashSync(password, 10)
let user

  //Checking if account already exists
  try {
    let existingUser = await User.userModel.findOne({email});

    if(existingUser){
      return res.status(409).json({message: "User already exist"})
     }

    user = new User.userModel({
      name: name,
      email: email,
      password: securedPassword
    });
    user = await user.save()
     
  } catch (err) {
   return res.status(500).json({message: 'Some error occured'})
  }if (!user) {
    return res.status(400).json({ message: "Error occured" });
  }
  return res.status(201).json({message: "User successfully created", user})

  
 
};

//LOGIN
exports.userLogin = async(req, res, next) => {
  let existingUser
  const {email, password} = req.body

  try{
    existingUser = await User.userModel.findOne({email: email})

    if(!existingUser){
      return res.status(404).json({message: "No user found, Signup Instead"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
      return  res.status(401).json({message: "Incorrect Password"})
    }
    
  }
  catch(err){
    return console.log(err)
  }

  return res.status(200).json({message: "Login Successful", existingUser})
}

//getAllUser
exports.getAllUsers = async(req, res, json) => {
  let users
  try{
    users = await User.userModel.find()
  }
  catch(err){
    return console.log(err)
  }
  if(!users){
    return res.status(404).json({message: "Error Occured"})
  }
  return res.status(200).json({users})
}


//ADDMOREDETAILS
exports.addMoreDetails = async(req, res, json) => {
  let updateValue
  const id = req.params.id
  const {age,location,status,education,goals,background} = req.body
  try{
    updateValue = await User.userModel.findByIdAndUpdate({_id:id},{
      age,
      status,
      location,
      education,
      goals,
      background
    })
    updateValue = updateValue.save()
  }
  catch(err){
    return console.log(err)
  }
  if(!updateValue){
    return res.status(409).json({message: "Unable to add data"})
  }
  return res.status(200).json({updateValue})
}

//getUserDetailsById
exports.getUserDetailsById = async (req, res, next) => {
  let user
  const id = req.params.id
  try{
    user = await User.userModel.findById({_id: id})
  }
  catch(err){
    return console.log(err)
  }
  if(!user){
    return res.status(404).json({message: "No user details found"})
  }
  return res.status(200).json({user})
}