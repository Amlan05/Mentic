import React, { useState, useEffect, useMemo } from "react";
import "../Components.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import {io} from "socket.io-client"

const OneToOneChat = () => {

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState([]);
  // const [placeHolder, setPlaceHolder] = useState("Type a message.....")
  const params = useParams();
  const senderId = localStorage.getItem("userId");
  const receiverId = params.id;


  const socket = useMemo(() => {
    return io("https://docker-mentic-59it.vercel.app/personal"); 
  }, []);

  const sendMessage = async () => {

    socket.emit('post-message', {sender: senderId, receiver: receiverId, content: newMsg})
    setNewMsg("")

  };

   const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
   }

  useEffect(() => {

    socket.on('connect', () => {
      console.log("user connected")
      socket.emit('getChats', {senderId: senderId, receiverId: receiverId})
    })

    socket.on('prev-chats', (data) => {
      setMessages(data)
      console.log(data)
    })

    socket.on('show-message', (data) => {
      setMessages((messages) => [...messages, data])
      console.log(messages)
    })

    return () => {
      socket.disconnect();
      socket.off('show-message')
    }

  }, [socket]);

  return (
    <div className="container-fluid group-chat-container">
      <div className="row chat-row justify-content-center">
        <h2 className="per-chat mt-4">Personalised Chat</h2>
        <div className="col-10 chat-col ">
            <div className="row chat-div">
          <ScrollableFeed className="scroll-feed">
            <div className="col-12 chats">
              {messages.map((p) => {
                const isUserId = p.senderId == senderId;
                return (
                  <span
                    className={`chat-message ${
                      isUserId ? "user-message" : "other-message"
                    }`}
                  >
                    {" "}
                    {p.content}
                  </span>
                );
              })}
            </div>
            
          </ScrollableFeed>
         
          <div className="col-12">
          <form className="input-group mb-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Type a message....."
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              name="message"
              required
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Send
            </button>
            <Link to='/feedback'><button type="button" class="btn btn-success">End Chat</button></Link>
          
          </form>
         

        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OneToOneChat;
