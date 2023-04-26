// import {setAuthToken} from './setAuthToken'; 

export default function getAuthToken() {

//check jwt token
const token = localStorage.getItem("token");

if (token) {
    // setAuthToken(token);
    console.log('Token:  '+ token); 
    return token; 
} else {
    console.log('no token');
}
}