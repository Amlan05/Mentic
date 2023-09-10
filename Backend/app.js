
const express = require('express')
const mongoose = require('mongoose')
const socketIO = require('socket.io')
const app = express()

const userRouter = require('./Routes/userRouter')
const doctorRouter = require('./Routes/DoctorRoutes')
const healthRouter = require('./Routes/HealthRoutes')
const blogRouter = require('./Routes/BlogRoutes')
const groupChatRouter = require('./Routes/GroupChatRoutes')
const oneChatRouter = require('./Routes/One2OneRoutes')
const cors = require('cors')


// Middlewares
app.use(express.json())
app.use(cors())
app.use('/users', userRouter.userRouter)
app.use('/doctors', doctorRouter.doctorRouter)
app.use('/healths', healthRouter.healthRouter)
app.use('/blogs', blogRouter.blogRouter)
app.use('/groupChats', groupChatRouter.groupChatRouter)
app.use('/oneChats', oneChatRouter.oneChatRouter)


//Mongoose Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://Mentic:Mentic05..@cluster0.3inrpgs.mongodb.net/?retryWrites=true&w=majority');
console.log("Database Connected")
}




//server connection
app.listen( '8100', ()=> {
    console.log("Server Started")
})