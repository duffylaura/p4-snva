
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login  = (props) => { 

    //set up navigation variable for redirection if successfully logged in
    const navigate = useNavigate(); 

    // set initial form state to empty strings 
    const [formState, setFormState] = useState({email:'', password: ''});

    //function to use login authentication post route 
    const loginAuthRoute =  async (data) => {
       const options = {
            method: 'POST',
            url: 'http://localhost:8077/api/v1/user/authenticate',
            headers: {'Content-Type': 'application/json'},
            data: {email: data.email, password: data.password}
          };
          console.log("Dheeraj " + options); 
          
        const response = await axios.request(options); 
        
        const responseStatus = await response.data.status; 

        if (responseStatus === 'success') {
            console.log("Success - You have been logged in.")
            return true; 
        } else {
            console.log("You were unable to be logged in.")
            return false; 
        }

        // original code works but needed async /await added in 
        //   axios
        //   .request(options)
        //   .then(function async (response) {
        //     console.log(response.data);
        //     await (response.data.status); 
        //     console.log("print response  " + response.data.status); 
            
        //     if (response.data.status === 'success') {
        //         return true; 
        //     }
        //   }).catch(function (error) {
        //     console.error(error);
        //     return false; 
        //   });         

    };


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
            const booleanResponse = await loginAuthRoute (formState);
                // FUTURE TODO: set status of user Auth.login (data.login.token)
            if (booleanResponse) { 
                //If successfully logged in, redirect user to next page
                console.log("user is logged in"); 
                navigate("/welcomeUser");
            } else {
                console.log("You are not logged in. No such user exists.")
                alert("This user does not exist. Please register. Click OK to redirect to Registration.")
                navigate("/register");
            }
        } catch (e) {
            console.error(e); 
        }
        // // clear form values
        setFormState({
            email: '', 
            password: '',
        });
    };


    return (
        <div>
            <h1> LOGIN PAGE </h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Email:  
                    <input 
                    name="email"
                    type = "email"
                    placeholder= "Enter Email"
                    value = {formState.email}
                    onChange= {handleChange}
                    />
                </label>
                <label>
                    Password  
                    <input 
                    name="password"
                    type = "password"
                    placeholder= "Enter Password"
                    value = {formState.password}
                    onChange= {handleChange}
                    />
                </label>
                <button> Login </button>
            </form>
        </div>

        );
    }

export default Login; 