
const Health = require('../Model/HealthModel')
const natural = require('natural')
const User = require('../Model/UserModel')
const mongoose = require ('mongoose')

//POST_HEALTH_DATA
exports.postHealthData = async (req, res, next) => {
    let healthData
    const {userid, primarycondition, secondarycondition, detailedreason} = req.body

    const tokenizer = new natural.WordTokenizer()
    const keyWords = tokenizer.tokenize(detailedreason)

    try{

        
        healthData = new Health.healthModel({
            userid,
            primarycondition,
            secondarycondition,
            detailedreason,
            keywords: keyWords
        })
        healthData = healthData.save()
       
        
    }catch(err){
        console.log("Amlan")
        console.log(err)
        return res.status(500).json({message : "Some error occured"})
    }

    if(!healthData){
        return res.status(409).json("Health data could not be recorded")
    }
    
   
    return res.json({message: "Health data received", healthData:healthData})
    
}

//GET_HEALTH_DATA
exports.getHealthData = async (req, res, status) => {
    let healthData
    try{
        healthData = await Health.healthModel.find()
    }
    catch(err){
        return console.log(err)
    }
    if(!healthData){
       return res.status(404).json({message: "No healthData Found"})
    }
    return res.status(200).json({healthData})
}


//GET_SIMILAR_USERS
exports.similarUsers = async (req, res, next) => {
    let similarUsers
    let currentUser
    const id = req.params.id
    try{
        currentUser = await User.userModel.find({userId: id})

        if(!currentUser){
            return res.status(404).json({message: "Current User not found", id})
        }
        
        try{
        similarUsers = await User.userModel.find({
            _id: { $ne: id },
            keywords:  currentUser.keywords
        }).limit(3)
    }
    catch(err){
        return console.log(err)
    }
    if(!similarUsers){
        return res.status(404).json({message: "No similar users found"})
    }
    return res.status(200).json({similarUsers})
    }
    
    catch(err){
        console.log(err)
    }
}

exports.getHealthDataById = async(req, res, next) => {
    let data
    const id = req.params.id
    try{
        data = await Health.healthModel.find({userid: id})
    }
    catch(err){
        return console.log(err)
    }
    if(!data){
        return res.status(404).json({message: "No Heath data found"})
    }
    return res.status(200).json({data})
}