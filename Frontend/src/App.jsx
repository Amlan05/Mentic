import React from 'react';
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header'
import HomePage from './Components/HomePage'
import Blog from './Components/Blog/Blog'
import DashBoard from './Components/DashBoard';
import GroupChat from './Components/GroupChat/GroupChat';
import Services from './Components/Services';
import Login from './Components/Login';
import PeerMatch from './Components/PeerMatch'
import OneToOneChat from './Components/GroupChat/OneToOneChat';
import AddBlog from './Components/Blog/AddBlog';
import Session from './Session';
import FeedBack from './Components/GroupChat/FeedBack';
import {useSelector} from "react-redux"
import { useDispatch } from 'react-redux';
import { userActions, adminActions } from './Components/Store';

function App() {

  const dispatch = useDispatch()

  useEffect( () => {
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }
    else if(localStorage.getItem("doctorId")){
      dispatch(adminActions.login())
    }
  },[])



  const isUserLoggedIn = useSelector( (state) => state.user.isLoggedIn)
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  console.log("isuserLoggedIn", isUserLoggedIn)
  console.log("isAdminLoggedIn", isAdminLoggedIn)

  return (
 <>
 <Header></Header>
<Routes>
  <Route path="/" element={<HomePage></HomePage>}></Route>
  <Route path="/blogs" element={<Blog></Blog>}></Route>
  <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
  <Route path="/services" element={<Services></Services>}></Route>
  <Route path="/chats" element={<GroupChat></GroupChat>}></Route>
  <Route path="/auth" element={<Login></Login>}></Route>
  <Route path='/peers' element={<PeerMatch></PeerMatch>}></Route>
  <Route path="/one2one/:id" element={<OneToOneChat></OneToOneChat>}></Route>
  <Route path='/addBlog' element={<AddBlog></AddBlog>}></Route>
  <Route path='/session' element={<Session></Session>}></Route>
  <Route path='/feedback' element={<FeedBack></FeedBack>}></Route>
</Routes>
 </>
  )
}

export default App
