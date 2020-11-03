//dbromle2
//se3316 lab3

const express = require("express");
const data = require("./static/Lab3-timetable-data.json");
const app = express();
const fs = require("fs");
const router = express.Router();

let rawdata = fs.readFileSync("./static/Lab3-timetable-data.json");
let courses = JSON.parse(rawdata);

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

//load the index.html page
router.get("/", (req,res)=>{
    res.sendFile("index.html", {root: __dirname});
});

//Step 1 (15pts)
app.get("/courses", (req,res)=>{
    let myArr = [];

    for(var i=0; i < courses.length; i++){
        myArr[i] = courses[i].subject + " " + courses[i].className;
    }

    res.send(myArr);
});

//Step 2 (10pts)
app.get("/courses/:subject", (req,res)=>{
    let s = req.params.subject;
    let myArr = [];

    const course = courses.filter(c => c.subject === s);
    if(course.length == 0) res.status(404).send("This subject code doesn't exist.");

    for(var i=0; i<course.length; i++){
        myArr[i] = course[i].catalog_nbr;
    }

    res.send(myArr);
});

//Step 3 (10pts)
app.get("/courses/:subject/:course", (req,res)=>{
    let s = req.params.subject;
    let cor = req.params.course;
    //let com = req.params.component;
    let myArr = [];

    console.log(s + " " + cor + " ");

    const course = courses.filter((c => c.subject === s) && (c => c.catalog_nbr === cor) );
    if(course.length == 0) res.status(404).send("This subject code doesn't exist.");

    
    res.send(course);
});

app.use('/api', router); // Set the routes at '/api'

//start the server
const port = process.env.port || 3000;
app.listen(port, () => console.log("Listening on port " + port + "."));