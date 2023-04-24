
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        <div>
            <h1> REGISTER PAGE </h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Email:  
                    <input 
                    name="email"
                    type = "email"
                    placeholder= "Email"
                    value = {formState.email}
                    onChange= {handleChange}
                    />
                </label>
                <label>
                    First Name:  
                    <input 
                    name="firstName"
                    type = "string"
                    placeholder= "First Name"
                    value = {formState.firstName}
                    onChange= {handleChange}
                    />
                </label>
                <label>
                    Last Name:  
                    <input 
                    name="lastName"
                    type = "string"
                    placeholder= "Last Name"
                    value = {formState.lastName}
                    onChange= {handleChange}
                    />
                </label>
                <label>
                    Mobile Number: 
                    <input 
                    name="mobileNumber"
                    type = "string"
                    placeholder= "Mobile Number"
                    value = {formState.mobileNumber}
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

export default Register; 