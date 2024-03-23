import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import axios from "axios"
import { Link } from 'react-router-dom'

const Services = () => {


  const navigate = useNavigate()

  const [primaryCond, setPrimaryCond] = useState(['Happy', 'Stressed', 'Sad', 'Anxious', 'Others'])
  const [subCond, setSubCond] = useState([''])
  const Happy = [{name:'Content', val:0.8},{name:'Excited', val:4},{name:'Peaceful', val:2}]
  const Stressed = [ {name:'Overwhelmed', val:-4},{name:'Worried', val:-3},{name:'Frustrated', val:-3}]
  const Sad = [{name:'Lonely', val:-4},{name:'Restless', val:-3},{name:'Grief-stricken', val:-1}]
  const Anxious = [{name:'Nervous', val:-4},{name:'panic', val:-3},{name:'Apprehsive', val:-1}]
  
  const userid = localStorage.getItem("userId")
  const [healthData, setHealthData] = useState({userid: userid})

  const calcScore = (e) => {
   console.log('Amlan')
  }

  const updateFunction = (e) => {

    if(e.target.name === 'primarycondition'){
    const cond = e.target.value
    if(cond === 'Happy'){
    setSubCond(Happy)
    }
    else if(cond === 'Stressed'){
      setSubCond(Stressed)
    }
    else if(cond === 'Sad'){
      setSubCond(Sad)
    }
    else if(cond === 'Anxious'){
      setSubCond(Anxious)
    }
    else{
      setSubCond(['Others'])
    }
  }


    setHealthData({
      ...healthData,
      [e.target.name]: e.target.value
    })
    console.log(healthData)

  }

  const counselling = async() => {
    if(!localStorage.getItem('userId')){
      navigate('/auth')
    }
    try{
      let post = await axios.post('https://docker-mentic-59it.vercel.app/healths/giveHealthData',healthData)
      console.log(post)
      navigate('/peers')
    }
    catch(err){
      return console.log(err)
    }

   
  }

  const sendData = (e) => {
    e.preventDefault()
    counselling()
  }

  

  return (
    
    // Carausel

    <div className='container-fluid servicess'>
    <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class="active" aria-current="true"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item">
    <img src="https://img.freepik.com/free-vector/group-people-celebrating-together_52683-32552.jpg?w=2000" className="d-block w-100 carousel-img" alt="..."/>
     
      <div class="container">
        <div class="carousel-caption">
          {/* <h1>Example headline.</h1>
          <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p> */}
          <Link to='/blogs'><p><a class="btn btn-lg btn-success" href="#">Read blogs from experts</a></p></Link>
        </div>
      </div>
    </div>
    <div class="carousel-item active carousel-item-start">
    <img src="https://img.freepik.com/free-vector/hand-drawn-business-communication-concept_52683-76159.jpg?w=1380&t=st=1694270603~exp=1694271203~hmac=bbb4242c1b5b1a63bbaef4b9ec5351b740fa673d05bd4f8cd083680a710a1f62" className="d-block w-100 carousel-img" alt="..."/>
      <div class="container">
        <div class="carousel-caption">
          {/* <h1>Another example headline.</h1>
          <p>Some representative placeholder content for the second slide of the carousel.</p> */}
          <Link to='chats'><p><a class="btn btn-lg btn-success" href="#">Connect with your peers</a></p></Link>
        </div>
      </div>
    </div>
    <div class="carousel-item carousel-item-next carousel-item-start">
    <img src="https://img.freepik.com/free-vector/habit-tracker-template_23-2148742797.jpg?w=1380&t=st=1694283029~exp=1694283629~hmac=4e702bb72dafd22a129b0767b3f720c2f87d37b121669d7b061d11fd1aff317c" className="d-block w-100 carousel-img" alt="..."/>
      <div class="container">
        <div class="carousel-caption">
          {/* <h1>One more for good measure.</h1>
          <p>Some representative placeholder content for the third slide of this carousel.</p> */}
          <Link to='/dashboard'><p><a class="btn btn-lg btn-success" href="#">Track your daily well-being</a></p></Link>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

{/* How are you feeling today */}
<h2 className='now my-4 checktxt'>
  Now, lets's Check up on you
</h2>
{/* FEELING FORM */}
<div className='row justify-content-center'>
  <div className='col-sm-6 col-10'>

<form className='feeling-form my-4' onSubmit={sendData}>
  <h4 className='servcardtxt'>
    How are you feeling today??
  </h4>
    <select className="form-select" aria-label="Default select example"  name='primarycondition' required onChange={updateFunction}>
  <option  className='options' >Primary Condition</option>
  {primaryCond.map( p => {
    return(
      <>
      <option >{p}</option>
      </>
    )
  })}
</select>

<select className="form-select" aria-label="Default select example"  name='secondarycondition' required onChange={(e) => {
    updateFunction(e);
    calcScore(e);
  }}>
  <option className='options' >Secondary Condition</option>
  {subCond.map( p => {
    return(
      <>
      <option >{p.name}</option>
      </>
    )
  })}
</select>

     
  <div className="mb-3 servcardtxt">
  <label for="exampleFormControlTextarea1" className="form-label">Describe Your feelings</label>
  <textarea className="form-control"  rows="3" name="detailedreason" required onChange={updateFunction} ></textarea>
</div>
<button type="submit" className="btn btn-primary">Check Score</button>
</form>
</div>
</div>
</div>
  )
}

export default Services
