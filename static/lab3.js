//dbromle2
//lab3

/*This function is called when the search button is clicked.
It takes the values of the Subject, Course, and Component fields and sends them to the server*/
function onSearch(){
    let subSelIn = document.getElementById("subjectInput");
    let corSelIn = document.getElementById("catalogInput");
    let comSelIn = document.getElementById("componentInput");
    let subSel = subSelIn.value;
    let corSel = corSelIn.value;
    let comSel = comSelIn.value;

    console.log("Server sent these inputs:  " + subSel + " " + corSel + " " + comSel + " "); //testing

    let request = new XMLHttpRequest();


    if(subSel == "All Subjects" && corSel == "" && comSel == "All"){//Default entries; Step 1 Get all subjects and descriptions

        request.open("GET", "/courses", true);
        request.responseType = "json";
        request.send();
    } else if(subSel != "All Subjects" && corSel == ""){//Only subject code specified; Step 2 Get all course codes for a given subject code
        request.open("GET", "/courses/"+subSel, true);
        request.responseType = "json";
        request.send();
    } else if(subSel != "All Subjects" && corSel != ""){//subject code and course code specified; Step 3 Get timetable entry for a given subject code, course code, and optional component
        if(comSel != "All"){//Component specified
            request.open("GET", "/courses/"+subSel+"/"+corSel+"/"+comSel, true);
            request.responseType = "json";
            request.send();
        } else {//No component specified
            request.open("GET", "/courses/"+subSel+"/"+corSel, true);
            request.responseType = "json";
            request.send();
        }
    }

    request.onload = function(){
        const myResponse = request.response;
        populateOuts(myResponse);
    }
}

function onCreate(){//Not working properly, unsure why
    let sNameInInvalid = document.getElementById("sName");

    let request = new XMLHttpRequest();

    //Input validation (code from lab 1)
    let alpha = /^[0-9a-zA-Z\w\s]*$/;
    let validate = alpha.exec(sNameInInvalid.value); //validate the string
    let isStringValid = Boolean(validate);
    let sName = validate[0];

    console.log(sName);

    if(isStringValid){
        request.open("POST", "/schedule", true);
        //request.responseType = "json";
        request.send('"name: "'+sName+'"');
    }

    request.onload = function(){
        const myResponse = request.response;
        console.log(myResponse);
    }
}

function onShowSchedules(){
    let sNameInInvalid = document.getElementById("sName");

    let request = new XMLHttpRequest();

    //Input validation (code from lab 1)
    let alpha = /^[0-9a-zA-Z\w\s]*$/;
    let validate = alpha.exec(sNameInInvalid.value); //validate the string
    let isStringValid = Boolean(validate);
    let sName = validate[0];

    console.log(sName);

    if(isStringValid){
        if(sName ==""){//Step 8 Get list of schedule names and number of courses in each
            request.open("GET", "/schedule/view", true);
            request.responseType = "json";
            request.send();
        } else {//Step 6 Get list of subject code,course code pairs for schedule
            request.open("GET","/schedule/view/"+sName, true);
            request.responseType = "json";
            request.send();
        }
    }

    request.onload = function(){
        const myResponse = request.response;
        populateOuts(myResponse);
    }
}

//Function to populate the outputs
function populateOuts(jsonObj){
    let outList = document.getElementById("outList");
    let flavourText = document.getElementById("flavourText");
    const myCourse = jsonObj;

    //refresh the html every time a new response comes from the server
    while(outList.hasChildNodes()){
        outList.removeChild(outList.firstChild);
    }

    //throw an error if search parameters are bad
    flavourText.innerHTML = ("Search results: ");
    if(myCourse == null){
        let errorText = document.createElement("div");
        let t = document.createTextNode("Error: invalid search parameters");
        errorText.appendChild(t);
        outList.appendChild(errorText);
    } else {
        for (var i=0; i<myCourse.length; i++){
            //Populate the Subject Select fields
            let courseLi = document.createElement("li");
            
            courseLi.innerHTML = myCourse[i];

            outList.appendChild(courseLi);
        }
    }
}

