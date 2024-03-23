import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { userActions, adminActions } from './Store'
import { useNavigate } from 'react-router'
import './Components.css'
import axios from 'axios'


const Login = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSignup, setIsSignup] = useState(false)
  const [userData, setUserData] = useState({})
  const [status, setStatus] = useState()
  const [errMsg, setErrMsg] = useState()
  const [isUser, setIsUser] = useState(true)
 

  const sendData = async (what) => {

    if(what === "userSignup" ){
    let sendData 
    try{
       sendData = await axios.post('https://mentic-production.up.railway.app/users/signup', userData) 
       console.log(sendData.data.user._id)
       let setId = sendData.data.user
       localStorage.setItem('userId', setId._id)
       dispatch(userActions.login())
       setStatus(sendData.data.message)
       setTimeout( () => {
        navigate('/')
       },1000)
      }
      catch(err){
        setStatus(err.response.data.messsage)
        console.log(err)
      }
  }

  else if(what === "userLogin"){
    let sendData 
    try{
       sendData = await axios.post('https://mentic-production.up.railway.app/users/login', userData)
       const setId = sendData.data.existingUser
       localStorage.setItem('userId', setId._id)
      dispatch(userActions.login())
      setStatus(sendData.data.message)
      setTimeout( () => {
        navigate('/')
       },1000)
    }
      
      catch(err){
        setStatus(err.response.data.message)
      }
  
    }

  else if(what === "admin"){
    let sendAdminData
    try{
      sendAdminData = await axios.post("https://mentic-production.up.railway.app/doctors/login", userData)
     
    }
    catch(err){
    setStatus(err.response.data.message)
    }
    const doctorData = sendAdminData.data.existingDoctor
    localStorage.setItem("doctorId", doctorData._id)
    dispatch(adminActions.login())
    setStatus(sendData.data.message)
    navigate('/')
  }


}

  const setCheckUserTrue = () => {
    setIsUser(true)
  }

  const setCheckUserFalse = () => {
    setIsUser(false)
  }
  
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const submission = (e) => {
    e.preventDefault()

    if(isUser === true){
      if(isSignup === true){
        sendData("userSignup")
      }
      else if(isSignup === false){
        sendData("userLogin")
      }
    }

    else if(isUser === false){
      sendData("admin")
    }
  }

  const dynamicClass = isUser ? "nav-link active" : "nav-link"
  const dynamicAdmin = isUser ? "nav-link" : "nav-link active"

  return (


    <>
    <div className='container-fluid logincard'>
        <div className='row justify-content-center signup'>
            <div className='col-sm-7 col-md-4 formcon'>
    <div className='my-2 choose'>
    <ul className="nav nav-underline">
        <li className="nav-item">
           <a className={dynamicClass} aria-current="page" type='button' onClick={setCheckUserTrue}>Login as user</a>
        </li>
        <li className="nav-item">
           <a className={dynamicAdmin} aria-current="page" type='button' onClick={setCheckUserFalse}>Login as Admin</a>
        </li>
  </ul>
  </div>



    <form onSubmit={submission}>
        <div className="m-2">
    <h1>MENTIC</h1>
    {isUser && (
      <h2 className="h3 mb-3 fw-normal py-2">{isSignup ? "Signup / Create an account" : "Login"}</h2>
    )}

    {!isUser &&(
      <h2 className="h3 mb-3 fw-normal py-2">Login</h2>
    )}
    
    {isSignup && isUser && (
      <>
      <div className="form-floating py-2">
      <input type="text" name="name" className="form-control" id="floatingInput" placeholder="text" onChange={handleChange}  required pattern="[a-zA-Z ]{4,}"/>
      <label for="floatingInput">Name</label>
    </div>
      </>
    )}
    <div className="form-floating py-2">
      <input type="email" name='email' className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange}  required/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating py-2">
      <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange} minLength={5}  required/>
      <label for="floatingPassword">Password</label>
    </div>

    {isUser &&  (
      <button className="btn btn-primary w-100 py-3" type="submit">{isSignup  ? "Signup" : "Login"}</button>
    )}

    {!isUser && (
       <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
    )}
    
    {isUser &&  (
      <div type="button" className='loginoptn' onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Already a user? Login" : "Don't have an account? Create one"}</div>
    )}
    </div>
    
  </form>
  <h3 className='m-2'>{status}</h3>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login