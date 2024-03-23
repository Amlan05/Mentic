import React from 'react'
import './Components.css'
// style="background-color: rgb(46, 44, 44);
// style="color: white;"
// style="color: white;
// style="color: white;"
const Footer = () => {
  return (
    <>
   <div className="row justify-content-evenly pt-2 pb-5 one" >
      <div className="col-md-3 mt-4 two" >
        <h5>MENTIC</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing <br/> Aut repudiandae et, aliquam expedita vitae <br/>
          voluptate vero saepe magnam, <br/> eveniet quasi sapiente velit est non fugit.</p>
      </div>
      <div className="col-md-3 mt-4" >
        <h5>Important Links</h5>
        <a className="link-light text-decoration-none"href="#">Home</a><br/>
        <a className="link-light text-decoration-none"href="#">About us</a><br/>
        <a className="link-light text-decoration-none"href="#">Contact us</a><br/>
        <a className="link-light text-decoration-none"href="#">Our Team</a><br/>
        <a className="link-light text-decoration-none"href="#">Our Client</a><br/>
      </div>
      <div className="col-md-3 mt-4">
        <h5>Contact us</h5>
        <p>Niladri Vihar, Chandrasekharpur <br/>
          Odisha - 753004 <br/>
          <i className="bi bi-telephone-fill"></i> : 7606846664
        </p>
      </div>
    </div>

    <div class="row bg-secondary">
      <div class="col text-center two">
        <p class="my-2">Copyright 1999-2021 by Amlan All Rights Reserved</p>
      </div>
    </div>
    </>
  )
}

export default Footer
