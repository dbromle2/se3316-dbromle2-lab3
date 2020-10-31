//dbromle2
//lab3

// const fs = require("fs"); //to read & parse the json file
// //read & parse the json file
// let rawdata = fs.readFileSync("Lab3-timetable-data.json");
// const parsedJSON = JSON.parse(rawdata);

//Initiation function to load/populate the web page correctly
function pageInit(){
    for (var i=0; i<parsedJSON.length; i++){
        const subjectOption = document.createElement("option");
        //const componentOption = document.createElement("option");

        subjectOption = parsedJSON[i].subject;
        //componentOption = parsedJSON[i].ssr_component;

        subjectSelect.appendChild(subjectOption);
    }
}