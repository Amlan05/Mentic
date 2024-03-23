import React, {useState, useEffect} from "react";
import axios from 'axios'
import "./Components.css"


const DashBoard = () => {

  const [moreDetails, setMoreDetails] = useState({})
  const [userData, setUserData] = useState({})
  const [isDataAdded, setIsDataAdded] = useState()

  const id = localStorage.getItem("userId")

  const getUserDetails = async() => {
    let userById
    try{
     userById = await axios.get(`https://docker-mentic-59it.vercel.app/users/${id}`)
    }
    catch(err){
      console.log(err)
    }
    if(!userById){
      return console.log("data not found")
    }

    if(userById.data.user.goals === undefined){
      setIsDataAdded(false)
     addMoreData()
    }

    else{
      setIsDataAdded(true)
      setUserData(userById.data.user)
    }
   
  }

  const addMoreData = async () => {
    try{
    const moreData = await axios.patch(`https://docker-mentic-59it.vercel.app/users/addDetails/${id}`, moreDetails)
    console.log(moreData.data)
    }
    catch(err){
      console.log(err)
    }
    getUserDetails() 
    // setMoreDetails(moreData.data)
  }

  const handleChange = (e) => {
    setMoreDetails({
      ...moreDetails,
      [e.target.name]: e.target.value
    })
  }

  const submission = (e) => {
    e.preventDefault()

    addMoreData()

    setIsDataAdded(true)
    console.log(isDataAdded)
    console.log(moreDetails)
  }

  useEffect( () => {
    getUserDetails()   
  },[])

  return (
    <div className="container-fluid ">
{isDataAdded === false && (
  <div className="row justify-content-center">
<div class="col-sm-10 col-md-8 dashform mt-3">
        <h4 className="mb-3">Complete your profile</h4>
        <form className="needs-validation " onSubmit={submission}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label for="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="Amlan" required/>
            </div>

            <div className="col-sm-6">
              <label for="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Dash"  required/>
            </div>

            <div className="col-4">
              <label for="address" className="form-label">Age</label>
              <input type="Number" name="age" className="form-control" id="address" placeholder="20" onChange={handleChange}  required/>
            </div>

            <div className="col-6">
              <label for="address2" className="form-label">City</label>
              <input type="text" name="location" className="form-control age-input" id="address2" placeholder="Rourkela" onChange={handleChange}  required/>
            </div>

            <div className="col-md-5">
              <label for="country" className="form-label">Relationship Status</label>
              <select className="form-select" id="country" name="status" onChange={handleChange}  required>
                <option value="">select...</option>
                <option>Single</option>
                <option>Committed</option>
                <option>Dating</option>
              </select>
            </div>

    
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">A brief description about yourself</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="background" onChange={handleChange}  required></textarea>
            </div>

            <div class="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">Your Goals</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="goals" onChange={handleChange}  required></textarea>
            </div>

           </div> 

          <hr className="my-4" />

          <button className="w-50 btn btn-primary btn-lg" type="submit">Proceed</button>
        </form>
      </div>
  </div>
)}

      

{isDataAdded === true && (
  <div className="dash-main">
      <div className="row my-5 dashboard mx-3 text-center">
        <div className="col-sm-4 personal-data">
          <i className="bi bi-person-circle"></i>
          <h2>{userData.name}</h2>
          {/* <h3>Tik-Toker</h3> */}
          
          <div className="row justify-content-center my-5">
          <h3 className="mb-2">About</h3>
          <div className="col-sm-5 icons ">
          <i class="bi bi-balloon-fill">{userData.age}</i>     
          <i class="bi bi-geo-alt-fill">{userData.location}</i>
        
          </div>
          <div className="col-sm-5 icons ">
          <i class="bi bi-mortarboard-fill">{userData.education}</i>         
          <i class="bi bi-heart-fill">{userData.status}</i>
          </div>
            </div>  
          
        </div>
        
        <div className="col-sm-8">
          <div className="row justify-content-center">

          <div className="col-6 my-5">
          <h2>Background</h2>
          <p>{userData.background}</p>
        </div>

        <div className="col-6 my-5">
          <h2>Goals</h2>
          <p>{userData.goals}</p>
        </div>
        <div className="col-sm-9 bio-range my-5">
          <h2>Personality</h2>

         <div>
          <h5 className="mt-3">Introvert</h5>
        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="100" aria-valuemin="0"
          aria-valuemax="100">
          <div className="progress-bar bg-success introvert"></div>
        </div>

        <h5 className="mt-3">Thinking</h5>
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="30" aria-valuemin="0"
          aria-valuemax="100">
          <div className="progress-bar bg-info thinking"></div>
        </div>

        <h5 className="mt-3">Judging</h5>
        <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="45" aria-valuemin="0"
          aria-valuemax="100">
          <div className="progress-bar bg-warning Judging"></div>
        </div>

        <h5 className="mt-3">Assertive</h5>
        <div className="progress" role="progressbar" aria-label="Danger example" aria-valuenow="70" aria-valuemin="0"
          aria-valuemax="100">
          <div className="progress-bar bg-danger Assertive"></div>
        </div>

        <h5 className="mt-3">Intuitive</h5>
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="90" aria-valuemin="0"
          aria-valuemax="100">
          <div className="progress-bar bg-secondary thinking"></div>
        </div>

      </div>
        </div>
        </div>
        </div>
        
    </div>
    </div>)}
    </div>
  );
};

export default DashBoard;
