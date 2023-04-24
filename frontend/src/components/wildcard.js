import React from "react";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
}
from 'mdb-react-ui-kit';

const welcomeUser = () => {
    return (

    <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1"> UH-Oh! Looks like there is nothing here! </h4>
              <p> Why don't you return home and try again? </p>
            </div>

            

            <Link to = '/'>
                <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2">Take me home! </MDBBtn>
                </div>
            </Link>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
          
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
    )
}

export default welcomeUser; 