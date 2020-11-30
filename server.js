// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express'),
     bodyParser = require('body-parser'),
      cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
let port = 8089;
app.listen(port,(request,response)=>{
    console.log('app is running on port : '+port);
});

// post 
app.use('/addWeather',(request,response)=>{
    let newEntry={
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    }
    projectData.push(newEntry);
});

// get weather data
app.use('/weather',(request,response)=>{
    console.log(projectData);
    response.send(projectData);
});

