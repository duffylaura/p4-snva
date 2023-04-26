import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { useNavigate } from "react-router-dom";
import {loginAuthRoute} from '../utils/apiUtils';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import {ColorRing} from 'react-loader-spinner';
import Navbar from '../components/navbar';
import Profile from '../pages/profile'; 

const Login  = (props) => { 

    var a = 0; 

    var profileObject; 

    const navigate = useNavigate();

    // set initial form state to empty strings 
    const [formState, setFormState] = useState({email:'', password: ''});

    // create state variable that tracks loading state 
    const [isLoading, setIsLoading] = useState(false); 

    // Handle change function 
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Submit form function 
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        // When loading process is initiated, set loading state to true
        setIsLoading(true);

        try { 
            profileObject = await loginAuthRoute (formState);
            
            // if successful, will redirect to profile page
            if (profileObject === false) {
              alert ('Unable to login. Try again.')
              navigate('/');
            } else {
            // Dheeraj: wanted create state, put profileObject in it, pass state to component / props, render to profile
            a = 1; 
          }
        } catch (e) {
            console.error(e); 
        }

        // clear form values
        setFormState({ email: '', password: ''});
        
        //set loading state to false 
        setIsLoading(false); 

        if (a === 1) {

        // render Profile with passed in props 
        const container = document.getElementById('root');
        const root = createRoot(container); 
        root.render(
          <Profile 
            firstName = { profileObject.firstName }
            lastName = {profileObject.lastName}
            email = {profileObject.email}
            mobileNumber={profileObject.mobileNumber}
            profilePictureURL={profileObject.profilePictureURL}
          />
          );

        }
    };

    return (
      //In the return statement of your component, 
      // render the loader code conditionally based on the loading state.

      <div>
      {isLoading ? (
        <ColorRing
          visible={true}
          height="200"
          width=""
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#DE793B', '#C8444E', '#C8444F', '#CB466F', '#A94D8E']}
        />
        ) : (
        // render login form or next page content
        
        <div>
        <Navbar />

        <MDBContainer className="my-5 gradient-form">

        <MDBRow>
  
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">
  
              <div className="text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1"> LOGIN TO YOUR ACCOUNT</h4>
              </div>

              <form onSubmit={handleFormSubmit}>
          
                    <MDBInput 
                        wrapperClass='mb-4'
                        label = "Email"
                        name = "email"
                        type = "email"
                        placeholder = "Enter Email"
                        value = {formState.email}
                        onChange = {handleChange}
                        />

                    <MDBInput 
                        wrapperClass='mb-4'
                        label = "Password"
                        name = "password"
                        type = "password"
                        placeholder = "Enter Password"
                        value = {formState.password}
                        onChange = {handleChange}
                    />

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2"> Login </MDBBtn>
              </div>

              </form>

  
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

  )}
  </div>
)}

export default Login; 