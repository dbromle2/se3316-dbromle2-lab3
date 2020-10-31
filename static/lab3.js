//dbromle2
//lab3

// const fs = require("fs"); //to read & parse the json file
// //read & parse the json file
// let rawdata = fs.readFileSync("Lab3-timetable-data.json");
// const parsedJSON = JSON.parse(rawdata);

//get the json file
let requestURL = "Lab3-timetable-data.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = "json";
request.send();

request.onload = function(){
    const myResponse = request.response;
    populateOptions(myResponse);
}

//Initiation function to load/populate the web page correctly
function populateOptions(jsonObj){
    var subjectSelect = document.getElementById("subjectInput");
    const myCourse = jsonObj;

    let subjectArr = [];

    for (var i=0; i<myCourse.length; i++){
        if (subjectArr.includes(myCourse[i].subject)){

        } else {
            let subjectOption = document.createElement("option");
            //const componentOption = document.createElement("option");

            subjectArr[i] = myCourse[i].subject;
            subjectOption.text = myCourse[i].subject;
            //componentOption = parsedJSON[i].ssr_component;

            subjectSelect.add(subjectOption);
        }
    }
}