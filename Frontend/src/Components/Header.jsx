import React from 'react'
import { useState } from 'react';
import "./Components.css"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { userActions, adminActions } from './Store'

const Header = () => {

const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
const dispatch = useDispatch()

const [navbarOpen, setNavbarOpen] = useState(false);

const dynamicClass = localStorage.getItem('userId') ? 'middle' : ""

const handleNavbarToggle = () => {
  setNavbarOpen(!navbarOpen);
};

const handleLinkClick = () => {
  setNavbarOpen(false);
};

const logout = () =>{
  if(isUserLoggedIn){
  localStorage.removeItem('userId')
  dispatch(userActions.logout())
  }

  else if(isAdminLoggedIn){
    localStorage.removeItem('doctorId')
  dispatch(adminActions.logout())
  }
}

return (
    <>
    <nav className="navbar navbar-expand-lg bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">MENTIC</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={handleNavbarToggle} data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
      <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${dynamicClass}`}>
        <li className="nav-item">
          <Link to="/" className="nav-link active" onClick={handleLinkClick}><b>Home</b></Link>
        </li>
        
          <li className="nav-item">
          <Link to="/services" className="nav-link active" onClick={handleLinkClick}><b>Services</b></Link>
          </li>
       
          <li className="nav-item">
        <Link to="/blogs" className="nav-link active" onClick={handleLinkClick}><b>Blogs</b></Link>
        </li>
        {isAdminLoggedIn === true && (
          <li className="nav-item">
          <Link to="/addBlog" className="nav-link active" onClick={handleLinkClick}><b>Add Blog</b></Link>
          </li>
        )}
        
       
        <li className="nav-item">
        <Link to="/chats" className="nav-link active" onClick={handleLinkClick}><b>Group Chat</b></Link>
         </li>
       
        {isUserLoggedIn && (
          <li className="nav-item">
        <Link to="/dashboard" className="nav-link active" onClick={handleLinkClick}><b>My Dashboard</b></Link>
        </li>
        )}
        
      </ul>

      {isAdminLoggedIn && (
        <>
        <Link to="/"><button type="button" className="btn btn-dark" onClick= {() => {
         logout()
         handleLinkClick()
}}>Logout</button></Link>
        </>
      )}

      {isUserLoggedIn && (
        <>
        <Link to="/"><button type="button" className="btn btn-dark" onClick= {() => {
  logout()
  handleLinkClick()
}}>Logout</button></Link>
        </>
      )}

      {!isUserLoggedIn && !isAdminLoggedIn && (
        <>
        <Link to="/auth"><button type="button" className="btn btn-dark" onClick={handleLinkClick}>Login/Signup</button></Link>
        </>
      )}
      

      
    </div>
  </div>
</nav>
    </>
  )
}

export default Header
