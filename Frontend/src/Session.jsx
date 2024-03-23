import React from "react";
import './Components/Components.css'
import { useNavigate } from "react-router-dom";

const Session = () => {
  const navigate = useNavigate()
  return (
    <div className="session">
      <div className="row mt-4 mb-5 flex-wrap">
        <div className="col-lg-4"></div>


        <div className="col-lg-4">
          <button
            type="button"
            className="btn btn-secondary btn-lg px-4 me-md-2 my-3"
          >
            Upcoming Session
          </button>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            The power of meditation
          </h1>
          <p className="lead">
            Register for this session to have a deep insight about the positive
            impacts of meditation
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-light btn-lg px-4 bg-success" onClick={() => {
              (localStorage.getItem('userId')) ?
              setTimeout(()=>{
                navigate('/')
              },500) : navigate('/auth')
              }}>
              Register
            </button>
          </div>
        </div>

        
        <div className="col-lg-4 ">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-world-mental-health-day_52683-44659.jpg?w=826&t=st=1694094518~exp=1694095118~hmac=bf7b646cb8bf2246ad8cd62c0ada026ad701c49152dc332db009a0420ce53797"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="600"
            height="500"
            loading="lazy"
          />
        </div>
       
      </div>

      
        <div className="row">
       
        <h2 className="session-topic">Past Sessions</h2>
        
        </div>

        <div className="row justify-content-evenly past-row">
        <div className="col-sm-6 col-md-3 col-10 past-sesions">
        <h2 className="mt-3">Connecting Wellbeing</h2>

        <ul className="d-grid gap-4 my-5 list-unstyled small">
          <li className="d-flex gap-4">
            <img
              src="https://assets.weforum.org/article/image/S0tBnYyvGuljRvYU7PGhEpq38vZc1jXYTCiEw-iH-Cs.jpg"
              alt=""
              height={140} width={160}
            />
            <div>
              “Surround yourself with only people who are going to lift you higher.” – Oprah Winfrey
            </div>
          </li>
        </ul>
      </div>
      

      <div className="col-sm-6 col-md-3 col-10 past-sesions">
        
        <h2 className="mt-3">Importance of Yoga</h2>
        
        <ul className="d-grid gap-4 my-5 list-unstyled small">
          <li className="d-flex gap-4">
            <img
              src="https://img.freepik.com/free-vector/female-doing-yoga-meditation-mandala-background_1017-38763.jpg?w=826&t=st=1694105672~exp=1694106272~hmac=cd0d515dce74b920354c0b37d46a9991a2087640cd2808501a5d55b2862cacec"
              alt=""
              height={140}
            />
            <div>
              “Yoga is a mirror to look at ourselves from within."
            </div>
          </li>
        </ul>
      </div>

      <div className="col-sm-6 col-md-3 col-10 past-sesions">
        <h2 className="mt-3">Spread Positivity</h2>

        <ul className="d-grid gap-4 my-5 list-unstyled small">
          <li className="d-flex gap-4">
            <img
              src="https://i0.wp.com/lifeandmore.in/wp-content/uploads/2020/05/SHAMPA-MOITRA-2.jpg?resize=333%2C532&ssl=1"
              alt=""
              height={140} width={220}
            />
            <div>
              "Find out who you are and do it on purpose." — Dolly Parton.
            </div>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Session;
