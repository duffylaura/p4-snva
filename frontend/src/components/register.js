
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {registerPostRoute} from '../utils/apiUtils';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import {ColorRing} from 'react-loader-spinner';
  
const Register = (props) => {
    // set up navigation variable for redirection if successfully logged in
    const navigate = useNavigate(); 

    //set initial form state to empty strings 
    const [formState, setFormState] = useState({email: '', firstName: '', lastName: '', mobileNumber: '', password: ''}); 

    // create state variable that tracks loading state 
    const [isLoading, setIsLoading] = useState(false); 

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

        // When loading process is initiated, set loading state to true
        setIsLoading(true);

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
        setFormState({email: '', 
        firstName: '', 
        lastName: '', 
        mobileNumber: '', 
        password: ''});

        //set loading state to false 
        setIsLoading(false);
    };

    return (
       //In the return statement of your component, render the loader code conditionally based on the loading state.

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

      )}
      </div>
)}

export default Register; 