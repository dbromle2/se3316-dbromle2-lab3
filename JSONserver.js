//dbromle2
//

const express = require("express");
const app = express();
const router = express.Router();

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));

//load the index.html page
// router.get("/", (req,res)=>{
//     res.json("Lab3-timetable-data.json", {root: __dirname});
// });

app.use('/api', router); // Set the routes at '/api'

//start the server
const port = (process.env.port + 1) || 3001;
app.listen(port, () => console.log("Listening on port " + port + "."));