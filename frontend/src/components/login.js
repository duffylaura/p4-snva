
import React, { useState } from "react";
import { redirect } from "react-router-dom";
import axios from 'axios';

const Login  = (props) => { 

    // set initial form state to empty strings 
    const [formState, setFormState] = useState({email:'', password: ''});

    //function to use login authentication post route 
    const loginAuthRoute = (data) => {
       const options = {
            method: 'POST',
            url: 'http://localhost:8077/api/v1/user/authenticate',
            headers: {'Content-Type': 'application/json'},
            data: {email: data.email, password: data.password}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            console.log("Status:  " + response.data.status)
            if (response.data.status === 'success') {
                return true; 
            }
          }).catch(function (error) {
            console.error(error);
            return false; 
          });         

    };



    // Handle change function 
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(formState);
        setFormState({
            ...formState,
            [name]: value,
        });
    };


    // Submit form function 
    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        console.log(formState); 
        try {
            const booleanResponse = await loginAuthRoute ({
                variables: {...formState}
            })
            if (booleanResponse) {
                console.log("user is logged in"); 
                // set status of user Auth.login (data.login.token)
                // redirect 
                return redirect("/welcomeUser");
            } else {
                console.log("You are not logged in. No such user exists.")
            }
        } catch (e) {
            console.error(e); 
        }
        // clear form values
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
                    name="inputEmail"
                    type = "email"
                    placeholder= "Enter Email"
                    value = {formState.email}
                    onChange= {handleChange}
                    />
                </label>
                <label>
                    Password  
                    <input 
                    name="inputPassword"
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