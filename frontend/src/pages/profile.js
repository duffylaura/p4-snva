import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';
import Navbar from '../components/navbar';
import Auth from '../utils/auth';

// const profile = (props) => {

function profile ({firstName, lastName, email, mobileNumber, profilePictureURL}) {

  if (Auth.loggedIn()) {   // Auth.loggedIn --> If there is a token and it's not expired, return `true`

  // const {firstName, lastName, email, mobile, profilePictureURL } = props;

    return (

     <div>

    < Navbar />

    <MDBContainer className="my-5 gradient-form">
      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1"> Welcome back, {firstName} {lastName}</h4>
            </div>
          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">   
          <img
            src= {profilePictureURL}
            alt="user profile picture"
          />
          </div>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
    </div>
    )
} else {
  alert('Your session has expired. Please login.');
  window.location.assign('/login'); 
}
}

export default profile; 