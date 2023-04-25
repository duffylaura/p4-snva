# Project Four for SNVA

</br>

## Given a backend as a Docker image, create and connect a React.js frontend that allows users to be created and log-in, passing a JWT authentication process.

</br>

## How to Use

Provided you have Docker desktop on your machine and PORTS 3001 and 8077 are available... 

```
git clone
cd frontend 
npm install 
docker pull dheerajthedev123/bootcamp-api
docker run -p 8077:8077 dheerajthedev123/bootcamp-api:dbfixed
npm start 

```
</br>

## Project Brief 


*As a member of frontend development team, you’re going to build an app which demonstrates how to manage authentication in React.js using JWT.*

*NOTE: For the shape of JSON request and response, pull the docker Image of Spring-Boot Backend.*

*Tasks make following components:* 
1. Login page, it must have user ID and password, validation must be there once login is successful, you need to save the token in local storage
2. Signup page, it must  signup the user based on the swagger endpoint please refer the docker container 
3. Dashboard, on dashboard just display a welcome message, using the email and the name ! 
4. Add styling to each page 

*NOTE: Buidling this with the mindset that we will be adding to this and turning it into an ecommerce platform.*


