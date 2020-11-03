//dbromle2
//se3316 lab3

const express = require("express");
const app = express();
const fs = require("fs");
const fsfs = require("fs");
const router = express.Router();

let rawdata = fs.readFileSync("./static/Lab3-timetable-data.json");
let courses = JSON.parse(rawdata);

let rawScheduleData = fsfs.readFileSync("./schedule.json");
let sData = JSON.parse(rawScheduleData);

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

//allow for parsing json for POSTs
app.use(express.json());

//load the index.html page
router.get("/", (req,res)=>{
    res.sendFile("index.html", {root: __dirname});
});

/*--------------- GETs ---------------*/

//Step 1 Get all subjects and descriptions
app.get("/courses", (req,res)=>{
    let myArr = [];

    for(var i=0; i < courses.length; i++){
        myArr[i] = courses[i].subject + " " + courses[i].className;
    }

    res.send(myArr);
});

//Step 2 Get all course codes for a given subject code
app.get("/courses/:subject", (req,res)=>{
    let s = req.params.subject.toUpperCase();
    let myArr = [];

    const course = courses.filter(c => c.subject === s);
    if(course.length == 0) res.status(404).send("This subject code doesn't exist.");

    for(var i=0; i<course.length; i++){
        myArr[i] = course[i].catalog_nbr;
    }

    res.send(myArr);
});

//Step 3 Get timetable entry for a given subject code, course code, and optional component
//No component specified
app.get("/courses/:subject/:course", (req,res)=>{
    let s = req.params.subject.toUpperCase();
    let cor = req.params.course.toUpperCase();
    //let com = req.params.component;
    let myArr = [];

    console.log(s + " " + cor + " "); //testing

    const course = courses.filter(c => (c.subject == s) && (c.catalog_nbr == cor));
    if(course.length == 0) res.status(404).send("This subject code doesn't exist.");

    for(var i=0; i<course.length; i++){
        myArr[i] = "Start time: " + course[i].course_info[0].start_time + " End time: " + course[i].course_info[0].end_time + " on " + course[i].course_info[0].days;
    }
    
    res.send(myArr);
});
//Component specified
app.get("/courses/:subject/:course/:component", (req,res)=>{
    let s = req.params.subject.toUpperCase();
    let cor = req.params.course.toUpperCase();
    let com = req.params.component.toUpperCase();
    let myArr = [];

    const course = courses.filter(c => (c.subject == s) && (c.catalog_nbr == cor) && (c.course_info[0].ssr_component == com));
    if(course.length == 0) res.status(404).send("A course in this configuration does not exist.");

    for(var i=0; i<course.length; i++){
        myArr[i] = "Start time: " + course[i].course_info[0].start_time + " End time: " + course[i].course_info[0].end_time + " on " + course[i].course_info[0].days;
    }
    
    res.send(myArr);
});

//Step 6 Get list of subject code,course code pairs for schedule
app.get("/schedule/view/:name", (req,res)=>{
    let name = req.params.name;
    let myArr = [];

    const schedule = sData.find(s => s.name == name);
    
    for(var i=0; i<schedule.sCourses.length; i++){
        myArr[i] = schedule.sCourses[i];
    }
    res.send(myArr);
});

/*--------------- POSTs ---------------*/

//Step 4 Create a new schedule
app.post("/schedule", (req,res)=>{
    let name = req.body.name;

    //throw error if it already exists
    let exists = sData.filter(s => s.name == name);
    if(exists.length != 0) return res.status(400).send("This name already exists");
    
    const schedule = {
        name: name,
        sCourses: []
    };

    console.log(name);

    sData.push(schedule);
    let newSchedule = JSON.stringify(sData);
    fs.writeFileSync("./schedule.json", newSchedule);

    res.send(schedule);
});

/*--------------- PUTs ---------------*/

//Step 5 Save a list of subject code,course code pairs to the given schedule name
app.put("/schedule/:name", (req,res)=>{
    let name = req.params.name;

    //throw error if the schedule name does not exist
    let exists = sData.filter(s => s.name == name);
    if(exists.length == 0) return res.status(400).send("Invalid schedule name");

    let schedule = sData.find(s => s.name == name);
    schedule.sCourses = req.body.sCourses;

    let newSchedule = JSON.stringify(sData);
    fs.writeFileSync("./schedule.json", newSchedule);

    res.send(schedule);
});

/*--------------- DELETEs ---------------*/

//Step 7 Delete a schedule with a given name
app.delete("/schedule/:name", (req,res)=>{
    let name = req.params.name;

    //throw error if the schedule name does not exist
    let exists = sData.filter(s => s.name == name);
    if(exists.length == 0) return res.status(400).send("Invalid schedule name");
    
    let schedule = sData.find(s => s.name == name);

    sData.splice(sData.indexOf(schedule),1);

    let newSchedule = JSON.stringify(sData);
    fsfs.writeFileSync("./schedule.json", newSchedule);

    res.send(schedule);
})

app.use('/api', router); // Set the routes at '/api'

//start the server
const port = process.env.port || 3000;
app.listen(port, () => console.log("Listening on port " + port + "."));