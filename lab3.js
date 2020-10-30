//dbromle2
//se3316 lab3

// let requestURL = "Lab3-timetable-data.json";
// let request = new XMLHttpRequest();
// request.open('GET', requestURL, true);
// request.responseType = "json";
// request.send();

// var subjectSelect = document.getElementById("subjectInput");

// //Initiation function to load/populate the web page correctly
// function pageInit(){
//     const contentJSON = request.response;
//     populateDropDowns(contentJSON);
// }

// function populateDropDowns(jsonObj){
//     const data = jsonObj;
    

//     for (var i=0; i<data.length; i++){
//         const subjectOption = document.createElement("option");
//         //const componentOption = document.createElement("option");

//         subjectOption = data[i].subject;
//         //componentOption = data[i].ssr_component;

//         subjectSelect.appendChild(subjectOption);
//     }
// }

const express = require("express");
const app = express();

const port = process.env.port || 3000;
app.listen(port, () => console.log("Listening on port " + port + "."));


app.get("/", (req,res)=>{
    res.send("Hello World");
});

app.get("/Lab3-timetable-data.json", (req,res) =>{
    res.send(populateDropDowns)
});


