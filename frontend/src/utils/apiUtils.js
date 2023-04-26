import React from "react";
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Auth from '../utils/auth';
import Profile from '../pages/profile';
import * as jose from 'jose'

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

        //////////////  JWT Local Storage LOGIN Token ///////////////

        //create token from response using user ID
        const userId  =  await response.data.user.id;
        
        const secret = new TextEncoder().encode(userId);

        const jwt = await new jose.SignJWT({ foo: "bar" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime('2h')
        .sign(secret);

        console.log(jwt); // eyJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.iPFY1ibZc5dTBzRD46ma-Du0avf20nYKtQQsgnyf7ZM

        // The Auth.login() method takes a token as an argument and stores it in localStorage
        Auth.login(jwt); 
    
        ///////////////////////////////////////////////////////

        const responseStatus = await response.data.status; 

        if (responseStatus === 'success') {
            console.log("Success - You have been logged in.")
               //Pass props to profile 
                const firstName = await response.data.user.firstName;
                const lastName = await response.data.user.lastName;
                const email = await response.data.user.email;
                const mobile = await response.data.user.mobileNumber; 
                const profilePictureURL = await response.data.user.profilePicture; 
                const pass = {
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email, 
                    mobile: mobile,
                    profilePictureURL: profilePictureURL}
    
            // render Profile with passed in props 
            const container = document.getElementById('root');
            const root = createRoot(container); 
            root.render(<Profile pass={pass} />);
        }
         else {
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

    await axios.request(options); 

    // New User was created. 

    // Now login new user  

    const loginOptions = {
        method: 'POST',
        url: 'http://localhost:8077/api/v1/user/authenticate',
        headers: {'Content-Type': 'application/json'},
        data: {email: data.email, password: data.password}
    };
    
    const response = await axios.request(loginOptions); 

    //////////////  JWT Local Storage REGISTER --> LOGIN Token ///////////////

        //create token from response using user ID
        const userId  =  await response.data.user.id;
        
        const secret = new TextEncoder().encode(userId);

        const jwt = await new jose.SignJWT({ foo: "bar" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime('2h')
        .sign(secret);

        console.log(jwt); // eyJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.iPFY1ibZc5dTBzRD46ma-Du0avf20nYKtQQsgnyf7ZM

        // The Auth.login() method takes a token as an argument and stores it in localStorage
        Auth.login(jwt); 

    ///////////////////////////////////////////////////////

    // Log In new user 

    if (Auth.loggedIn()) {
        //Pass props to profile 
        const firstName = await response.data.user.firstName;
        const lastName = await response.data.user.lastName;
        const email = await response.data.user.email;
        const mobile = await response.data.user.mobileNumber; 
        const profilePictureURL = await response.data.user.profilePicture; 
        const pass = {
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            mobile: mobile,
            profilePictureURL: profilePictureURL}
    
        // render Profile with passed in props 
        const container = document.getElementById('root');
        const root = createRoot(container); 
        root.render(<Profile pass={pass} />);
    }
    else {
        return false;
    }        
}

// function to get user information 
// actually using the auth route because can't access 'get profile' Post route 
// So, passed information as props over to profile 

