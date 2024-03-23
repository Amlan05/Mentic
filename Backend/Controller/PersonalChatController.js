const cors = require("cors");
const personalizedChat = require("../Model/One2OneModel");

module.exports = (io) => {


  const personalChat = io.of("/personal");

  personalChat.on("connection", (socket) => {

    console.log(`user connected with ${socket.id}`);

    // getchats
    socket.on("getChats", ({ senderId, receiverId }) => {
      let msgs;
      const getPersonalChats = async () => {
        try {
          msgs = await personalizedChat.One2OneModel.find({
            $or: [
              { senderId, receiverId },
              { senderId: receiverId, receiverId: senderId },
            ],
          });
        } catch (err) {
            return console.log(err)
        }
        if (!msgs) {
            return console.log("No chats found")
        }
        personalChat.emit('prev-chats', msgs)
      };
      getPersonalChats()
    });

    // postChats
    socket.on('post-message', async({sender, receiver, content}) => {

        console.log({sender, receiver, content})
        personalChat.emit('show-message', {senderId: sender, receiverId: receiver, content: content})

        try{
           const msg  = new personalizedChat.One2OneModel({
                senderId: sender,
                receiverId: receiver,
                content: content
            })
            await msg.save()
            console.log("message saved", msg)
        }catch(err){
            console.error("Error saving message:", err);
        }

    })
  });
};
