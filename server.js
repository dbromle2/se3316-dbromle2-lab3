//dbromle2
//se3316 lab3

// let requestURL = "Lab3-timetable-data.json";
// let request = new XMLHttpRequest();
// request.open('GET', requestURL, true);
// request.responseType = "json";
// request.send();

// var subjectSelect = document.getElementById("subjectInput");

const express = require("express");
const app = express();
const router = express.Router();

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

//load the index.html page
router.get("/", (req,res)=>{
    res.sendFile("index.html", {root: __dirname});
});

app.use('/api', router); // Set the routes at '/api'

//start the server
const port = process.env.port || 3000;
app.listen(port, () => console.log("Listening on port " + port + "."));