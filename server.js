// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Setup Server
const port=3000;
//depndancy
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Respond with JS object when a GET request is made to the homepage
app.get("/all", getData);

function getData (req,res){

  res.send(projectData);
  console.log(projectData)
} 
//post method

app.post("/addDate", postdata);
function postdata(req,res){
  projectData=req.body;
   res.send(projectData);
   console.log(projectData);
}

function listening(){
  console.log("server running"); 
  console.log(`running on localhost: ${port}`);
}

app.listen(port, listening());
