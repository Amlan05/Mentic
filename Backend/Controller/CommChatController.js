const cors = require("cors");
const GroupChat = require("../Model/GroupChatModel");

module.exports = (io) => {
  const communityChat = io.of("/community");

  communityChat.on("connection", (socket) => {

    console.log(`user connected with socket id ${socket.id}`);

    // getmessages 
    let chats
  
    const getGroupChats = async (req, res, next) => {
          try{
              chats = await GroupChat.GroupModel.find()
          }
          catch(err){
             return console.log(err)
          }
          if(!chats){
           return console.log("No chats found")
          }
          communityChat.emit('prev-msgs', chats)
      }
      getGroupChats()

    // postMessage

    socket.on("postMessage", async ({ userId, userName, message }) => {

      console.log({ userId, userName, message });
  
      communityChat.emit("show-message", { userId, userName, message });
  
      try {
          const grpchat = new GroupChat.GroupModel({
              userId,
              userName,
              message
          });
          await grpchat.save();
          console.log("Message saved:", grpchat);
          // socket.emit("messageSaved", { message: "sent", grpchat });
      } catch (err) {
          console.error("Error saving message:", err);
          // socket.emit("messageSaveError", { error: err.message });
      }
  });

  });
};
