//dbromle2
//lab3

//get the json file
// let requestURL = "Lab3-timetable-data.json";
// let request = new XMLHttpRequest();
// request.open('GET', requestURL, true);
// request.responseType = "json";
// request.send();

// request.onload = function(){
//     const myResponse = request.response;
//     populateOptions(myResponse);
// }

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

            // //Populate the Component Select fields
            // if (componentArr.includes(myCourse[i].course_info[0].ssr_component)){
            //     //yes it's jank but it works shut up
            // } else {
            //     let componentOption = document.createElement("option");

            //     componentArr[i] = myCourse[i].course_info[0].ssr_component;
            //     componentOption.text = myCourse[i].course_info[0].ssr_component;

            //     componentSelect.add(componentOption);
            // }
        }
    }
}

