import axios from 'axios';
// import {setAuthToken } from '../helpers/setAuthToken';
import Auth from '../utils/auth';

//function to use login authentication post route 
export const loginAuthRoute =  async (data) => {
    const options = {
            method: 'POST',
            url: 'http://localhost:8077/api/v1/user/authenticate',
            headers: {'Content-Type': 'application/json'},
            data: {email: data.email, password: data.password}
        };
        
        const response = await axios.request(options); 

        //////////////  JWT Local Storage LOGIN Token ///////////////

        //create token from response using user ID
        const idToken  =  await response.data.user.id;
    
        // The Auth.login() method takes a token as an argument and stores it in localStorage
        Auth.login(idToken); 
    
        ///////////////////////////////////////////////////////

        const responseStatus = await response.data.status; 

        if (responseStatus === 'success') {
            console.log("Success - You have been logged in.")
            return true; 
        } else {
            console.log("You were unable to be logged in.")
            return false; 
        }     

    };

//function to use signup post route 
export const registerPostRoute = async (data) => {
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

    // New User was created. Now get local storage token. Need response id number. 

    const loginOptions = {
        method: 'POST',
        url: 'http://localhost:8077/api/v1/user/authenticate',
        headers: {'Content-Type': 'application/json'},
        data: {email: data.email, password: data.password}
    };
    
    const loginResponse = await axios.request(loginOptions); 

    //////////////  JWT Local Storage REGISTER --> LOGIN Token ///////////////

     //create token from response using user ID
     const idToken  =  await loginResponse.data.user.id;

    // The Auth.login() method takes a token as an argument and stores it in localStorage
    Auth.login(idToken); 

    ///////////////////////////////////////////////////////

    if (response !== null) {
        return true
    } else {
        return false
    }
}

// function to get user information 
// actually using the auth route because can't access 'get profile' Post route 

