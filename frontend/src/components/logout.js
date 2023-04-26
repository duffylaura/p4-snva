import Auth from '../utils/auth'; 
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';

import Navbar from '../components/navbar';

export default function logout () {
    
    Auth.logout(); 

    return (
         <div>

        <Navbar />
       
        <MDBContainer className="my-5 gradient-form">

        <MDBRow>

        <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

            <div className="text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1"> You have been successfully logged out! </h4>
                <h4 className="mt-1 mb-5 pb-1"> Hope to see you again soon! </h4>
            </div>
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
        </div>
    )
}