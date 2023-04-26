import axios from 'axios';
import Auth from '../utils/auth';
import Profile from '../pages/profile';

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

            //Pass props to profile 
            
            const firstName = response.data.user.firstName;
            const lastName = response.data.user.lastName;
            const email = response.data.user.email;
            const mobile = response.data.user.mobileNumber; 
            const pass = {
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                mobile: mobile}

            //Render the Profile component with the pass object as a prop
            ReactDOM.render(<Profile pass={pass} />, document.getElementById('root'));

            // redirect to profile 
            window.location.replace('/profile');
        }
    };