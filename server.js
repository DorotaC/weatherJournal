// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initializing the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const server = app.listen(port, listening);
function listening(){
  console.log(`running on localport ${port}`);
}

//GET route that return projectData object
app.get('/all', sendData);

function sendData(req, res) {
  res.send(projectData);
  console.log("Got a GET request for the all route");
}

//POST route that adds incoming data to projectData object
 app.post('/weather', function(req, res){
   console.log(req.body);
   projectData.temp = req.body.temp;
   projectData.date = req.body.date;
   projectData.response = req.body.response;
   console.log("Got a POST request for the weather route");
 })
