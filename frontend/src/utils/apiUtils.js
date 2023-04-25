import axios from 'axios';

//function to use login authentication post route 
export const loginAuthRoute =  async (data) => {
    const options = {
            method: 'POST',
            url: 'http://localhost:8077/api/v1/user/authenticate',
            headers: {'Content-Type': 'application/json'},
            data: {email: data.email, password: data.password}
        };

        console.log("Show options response " + options); 
        
        const response = await axios.request(options); 
        
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

    console.log(response); 

    if (response !== null) {
        return true
    } else {
        return false
    }
}

// export function {loginAuthRoute, registerPostRoute}
