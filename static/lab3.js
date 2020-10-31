//dbromle2
//lab3

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
    var componentSelect = document.getElementById("componentInput");
    const myCourse = jsonObj;

    let subjectArr = [];
    let componentArr = [];
    for (var i=0; i<myCourse.length; i++){
        //Populate the Subject Select fields
        if (subjectArr.includes(myCourse[i].subject)){
            //yes it's jank but it works shut up
        } else {
            let subjectOption = document.createElement("option");

            subjectArr[i] = myCourse[i].subject;
            subjectOption.text = myCourse[i].subject;

            subjectSelect.add(subjectOption);
        }
        //Populate the Component Select fields
        if (componentArr.includes(myCourse[i].course_info[0].ssr_component)){
            //yes it's jank but it works shut up
        } else {
            let componentOption = document.createElement("option");

            componentArr[i] = myCourse[i].course_info[0].ssr_component;
            componentOption.text = myCourse[i].course_info[0].ssr_component;

            componentSelect.add(componentOption);
        }
    }
}