import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../Components.css";
import Popup from "./Popup";
import ScrollableFeed from "react-scrollable-feed";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {io} from "socket.io-client"

const GroupChat = ({ isopen, isAnonymous }) => {

  const navigate = useNavigate()
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  const id = localStorage.getItem("userId");
  const docId = localStorage.getItem("doctorId");

  const socket = useMemo(() => {
    return io("https://docker-mentic-59it.vercel.app/community"); 
  }, []);

  const [newMessages, setNewMessages] = useState([])
  const [newMsg, setNewMsg] = useState("");
  const [anonymous, setAnonymous] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const openModal = () => {
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setIsPopupOpen(false);
  };


  const sendMessage = async () => {

    //user
    if (isUserLoggedIn === true) {
      let user;
      try {
        user = await axios.get(`https://docker-mentic-59it.vercel.app/users/${id}`);
      } catch (err) {
        return console.log(err);
      }

      const userData = user.data.user;
      let name;
      if (anonymous === true) {
        name = "Anonymous";
      } else {
        name = userData.name;
      }


      socket.emit("postMessage", {userId: id, userName: name, message: newMsg})     
      setNewMsg('')
    }

    // admin
    else if (isAdminLoggedIn === true) {
      let doctor;
      try {
        doctor = await axios.get(`https://docker-mentic-59it.vercel.app/${docId}`);
      } catch (err) {
        console.log(err);
      }

      const doctorData = doctor.data.doctorData;
      let name;
      if (anonymous === true) {
        name = "Anonymous";
      } else {
        name = doctorData.name;
      }
      
      socket.emit("postMessage", {userId: docId, userName: name, message: newMsg})     
      setNewMsg('')
    }
  };

  const isLoggedIn = () => {
    if(!localStorage.getItem('userId')){
      navigate('/auth')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  

  useEffect(() => {

    isLoggedIn()

    socket.on('connect', () => {
      console.log("connected", socket.id)

      socket.emit('get-messages', )
    })

    socket.on('prev-msgs', (data)=>{
      setNewMessages(data)
      console.log(data)
    })

    socket.on('show-message', (data)=>{
      console.log(data)
      setNewMessages(newMessages => [...newMessages, data])
      console.log(newMessages)
    })

    return () => {
      socket.disconnect();
      socket.off("show-message");
    };


  }, [socket])

  return (
    <div className="container-fluid group-chat-container">
      <div className="row chat-row justify-content-center">
        <div className="col-12 mt-2"><h1 className="comm">Community Chat</h1></div>
        <div className="col-10 chat-col">
          <div className="row chat-div">
            <ScrollableFeed className="scroll-feed">
              <div className="col-12 chats">
                {newMessages && newMessages.map((p) => {
                  const isUserId = p.userId == (id || docId);
                  return (
                    <span
                      className={`chat-message ${
                        isUserId ? "user-message" : "other-message"
                      }`}
                    >
                      <b>{p.userName}</b> {p.message}
                    </span>
                  );
                })}
              </div>
            </ScrollableFeed>

            <div className="col-12">
              <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  name="message"
                  value={newMsg}
                  required
                  onChange={(e) => setNewMsg(e.target.value)}
                />
                <button
                  className="btn send-btn "
                  type="submit"
                >
                  Send
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        closeModal={closeModal}
        onYes={(value) => setAnonymous(value)}
        onNo={(value) => setAnonymous(value)}
      />
    </div>
  );
};

export default GroupChat;
