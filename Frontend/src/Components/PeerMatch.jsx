import React, {useState, useEffect} from "react";
import "./Components.css";
import axios from "axios"
import { Link } from "react-router-dom";

const PeerMatch = () =>{
    // const arr = [1,2,3,4,5]
    const [healthReport, setHealthReport] = useState([])
    const [peers, setPeers] = useState([])
    const [dr, setDr] = useState([])


    const id = localStorage.getItem("userId") 

    const getUserHealth = async () => {
      const data = await axios.get(`https://mentic-production.up.railway.app/healths/${id}`)
      console.log(data.data.data)
      const healthArray = data.data.data
      setHealthReport(healthArray[healthArray.length - 1])
      
    }

    const getSimilarUsers = async() => {
      const simpeer = await axios.get(`https://mentic-production.up.railway.app/healths/similarUsers/${id}`)
      console.log(simpeer.data.similarUsers)
      return simpeer.data
    }

    const getDoctors = async() => {
      const doctors = await axios.get('https://mentic-production.up.railway.app/doctors')
      console.log(doctors.data)
      return doctors.data
    }


    useEffect( () => {

      getUserHealth()
      

      getSimilarUsers()
      .then( p => {
        setPeers(p.similarUsers)
      })

      getDoctors()
      .then( p => {
        setDr(p.doctors)
      })
 
    },[])

  return (
    <div className="container">
    <div className="container-fluid">

      <div className="row justify-content-center my-5 ">
        <h2 className="mental-head">Mental Health Report</h2>
        <div className="col-md-8 my-4 mental-cond">
          
          <h5>Mental health condition: {healthReport.primarycondition}</h5>
          <h5>Mental health sub-condition: {healthReport.secondarycondition}</h5>

          {/* <div className="row">
            <div className="col-md-8 my-4">
              <h4>Generated Health Score: {healthReport.score}</h4>
            </div>
          </div> */}

        </div>
      </div>

      <div className="row justify-content-center my-5 ">
        <h2 className="mental-head">Here are your friends who came out of same problem as you have!!!!</h2>
        {peers.map( p => {
          
            return(
                <>
                <div className="card col-8 col-md-3 mx-4 my-4">
                <i className="bi bi-person-fill-check mt-3"></i>
       <div className="card-body">
       <h5 className="card-title">{p.name}</h5>
       <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       <Link to= {`/one2one/${p._id}`} className="btn btn-primary">Chat</Link>
  </div>
</div>
                </>
            )
        })}
      </div>

      <div className="row justify-content-center my-5 ">
        <h2 className="mental-head margin-mob">Here are our top psychiatrist specialized in your peoblem</h2>
        {dr.map( p => {
            return(
                <>
                <div className="card col-8 col-md-3 mx-4 my-4">
                <i className="bi bi-person-fill-check mt-3"></i>
       <div className="card-body">
       <h5 className="card-title">{p.name}</h5>
       <h6 className="card-title">{p.specialization}</h6>
       <p className="card-text">{p.status}</p>
       <Link to= {`/one2one/${p._id}`} className="btn btn-primary">Chat</Link>
  </div>
</div>
                </>
            )
        })}
      </div>
    </div>
    </div>
  );
};

export default PeerMatch;
