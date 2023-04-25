import axios from 'axios';
import {setAuthToken } from '../helpers/setAuthToken';

//function to use login authentication post route 
export const loginAuthRoute =  async (data) => {
    const options = {
            method: 'POST',
            url: 'http://localhost:8077/api/v1/user/authenticate',
            headers: {'Content-Type': 'application/json'},
            data: {email: data.email, password: data.password}
        };
        
        const response = await axios.request(options); 
        
        console.log(response); 
        //////////////  JWT Local Storage Tokens ///////////////

        //get token from response
        const token  =  await response.data.user.id;
    
        //set JWT token to local
        localStorage.setItem("token", token);
        
        //set token to axios common header
        setAuthToken(token);

        console.log('token from LOGIN api call: ' + token)

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

    const options2 = {
        method: 'POST',
        url: 'http://localhost:8077/api/v1/user/authenticate',
        headers: {'Content-Type': 'application/json'},
        data: {email: data.email, password: data.password}
    };
    
    const response2 = await axios.request(options2); 
    
    console.log('response2 ' + response2); 

    //////////////  JWT Local Storage Tokens ///////////////

     //get token from response
     const token  =  await response2.data.user.id;

    //set JWT token to local
    localStorage.setItem("token", token);
    
    //set token to axios common header
    setAuthToken(token);

    console.log('token from LOGIN api call: ' + token)

    ///////////////////////////////////////////////////////

    console.log(response); 

    if (response !== null) {
        return true
    } else {
        return false
    }
}

// export function {loginAuthRoute, registerPostRoute}
