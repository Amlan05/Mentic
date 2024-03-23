import React, { useState, useEffect } from "react";
import "./Components.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const HomePage = () => {
  const arr = [1, 2, 3, 4, 5];
  const qrr = [1, 2, 3, 4, 5, 6];
  const mental = [
    {
      name: "Anxious",
      img: "https://www.lehighcenter.com/wp-content/uploads/2018/11/signs-of-anxiety-disorder-2.jpg",
    },
    {
      name: "Stressed",
      img: "https://www.verywellmind.com/thmb/cSr36V8WEuUjjhjrzxo7kaeV1iM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1403986369-1111b9c6e231455fb3665cc2e1f95469.jpg",
    },
    {
      name: "Excited",
      img: "https://images.unsplash.com/photo-1625314517201-dd442445cf42?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhjaXRlZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Paranoia",
      img: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/paranoia.jpg",
    },
    {
      name: "Depression",
      img: "https://neurosciencenews.com/files/2023/08/depression-cancer-neurosinnce.jpg",
    },
  ];
  const [doctors, setDoctors] = useState([]);

  const getDoctordetails = async () => {
    const docdet = await axios.get("https://docker-mentic-59it.vercel.app/doctors/");
    console.log(docdet.data);
    return docdet.data;
  };

  useEffect(() => {
    getDoctordetails().then((p) => {
      setDoctors(p.doctors);
    });
    console.log(doctors);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center header-row">
        <div className="col-md-6 home-heading text-center my-5">
          <h1>Just Breathe & Relax</h1>
          <p className="home-p my-3">
            Spring Behavioral Health provides high quality mental health
            services using an
            <br></br>
            evidence-based approach.We beleive early in Identification.
          </p>
          <Link to="/session">
            <button
              type="button"
              className="btn btn-secondary px-3 session-btn"
            >
              Register for an session
            </button>
          </Link>
        </div>
      </div>
      <div className="row justify-content-center mind-content">
        <div className="col-10 text-center header-col">
          <h2 className="my-3">How are you feeling today?</h2>
          <div className="row justify-content-between mood">
            {mental.map((p) => {
              return (
                <div className="card cardhome">
                  <img
                    src={p.img}
                    className="card-img-top-st img-fluid"
                    alt="..."
                  />
                  <div class="card-body">
                    <p class="card-text">{p.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Specialist */}
      <div className="row justify-content-evenly Specialist">
        <h2 className="specialists my-4">Our Specialists</h2>
        {doctors.map((p) => {
          return (
            <div className="col col-sm-6 col-lg-3 text-center drCol">
              <div className="card doctor-card">
                <img
                  src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body dr-spl">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.status}</p>
                  <a  className="btn btn-primary dr-btn" >
                    {p.specialization}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* FeedBack */}

      <h2 className="fdk">Feedback</h2>
      <div className="row feedback ">
        {arr.map((p) => {
          return (
            <div className="feedback-col my-4">
              <h5>Amlan</h5>
              <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptatibus!
              </p>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
