
const express = require('express')
const mongoose = require('mongoose')
const {Server} = require('socket.io')
const {createServer} = require('http')
const app = express()
const server = createServer(app)
const cors = require('cors')
app.use(cors())

const communityChatController = require('./Controller/CommChatController')
const peronalizedChatController = require('./Controller/PersonalChatController')

require('dotenv').config();

const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors:{
      origin:"*",
      methods: ["GET", "POST"],
      credentials: true
  }
})

communityChatController(io)
peronalizedChatController(io)



const userRouter = require('./Routes/userRouter')
const doctorRouter = require('./Routes/DoctorRoutes')
const healthRouter = require('./Routes/HealthRoutes')
const blogRouter = require('./Routes/BlogRoutes')


// Middlewares
app.use(express.json())
app.use('/users', userRouter.userRouter)
app.use('/doctors', doctorRouter.doctorRouter)
app.use('/healths', healthRouter.healthRouter)
app.use('/blogs', blogRouter.blogRouter)


//Mongoose Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.3inrpgs.mongodb.net/?retryWrites=true&w=majority`);
console.log("Database Connected")
}


//server connection
server.listen( port, ()=> {
    console.log("Server Started")
})