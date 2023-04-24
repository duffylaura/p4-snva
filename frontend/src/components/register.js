
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  
const Register = (props) => {
    // set up navigation variable for redirection if successfully logged in
    const navigate = useNavigate(); 

    //set initial form state to empty strings 
    const [formState, setFormState] = useState({email: '', firstName: '', lastName: '', mobileNumber: '', password: ''}); 

    //function to use signup post route 
    const registerPostRoute = async (data) => {
        const options = {
            method: 'POST',
            url: 'http://localhost:8077/api/v1/user/signup',
            headers: {'Content-Type': 'application/json'},
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                mobileNumber: data.mobileNumber,
                password: data.password
            }
        };

        const response = await axios.request(options); 

        console.log(response); 

        if (response !== null) {
            return true
        } else {
            return false
        }
    }

    // Handle change function 
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(formState);
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Submit form function 
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        
        console.log("formState is:  " + formState); 

        try {
            const booleanResponse = await registerPostRoute (formState);
                // FUTURE TODO: set status of user Auth.login (data.login.token)
            if (booleanResponse) { 
                //If successfully logged in, redirect user to next page
                console.log("User has been registered."); 
                navigate("/welcomeUser");
            } else {
                console.log("There was an error in registering you. Try again")
                alert("Please register. Click OK to try again.")
                navigate("/register");
            }
        } catch (e) {
            console.error(e); 
        }
        // // clear form values
        setFormState({email: '', firstName: '', lastName: '', mobileNumber: '', password: ''});
    };

    return (
        <MDBContainer className="my-5 gradient-form">

        <MDBRow>
  
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">
  
              <div className="text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1"> REGISTER </h4>
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
                        label = "First Name"
                        name = "firstName"
                        type = "string"
                        placeholder = "First Name"
                        value = {formState.firstName}
                        onChange = {handleChange}
                        />
                        
                        <MDBInput 
                        wrapperClass='mb-4'
                        label = "Last Name"
                        name = "lastName"
                        type = "string"
                        placeholder = "Last Name"
                        value = {formState.lastName}
                        onChange = {handleChange}
                        />
                    <MDBInput 
                        wrapperClass='mb-4'
                        label = "Mobile Number"
                        name = "mobileNumber"
                        type = "string"
                        placeholder = "Mobile Number"
                        value = {formState.mobileNumber}
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
                <MDBBtn className="mb-4 w-100 gradient-custom-2"> Make an Account! </MDBBtn>
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

        );

}

export default Register; 