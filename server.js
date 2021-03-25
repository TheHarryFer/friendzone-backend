const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const $ = require("jquery");

//const cookieParser = require("cookie-parser");

const app = express();

//jwt secretkey
const secretKey = require("./app/config/auth.config").secret;

//cors
var corsOptions = {
    origin : "*",
    credentials : false, 
}
app.use(cors(corsOptions));
app.use(bodyParser.json({limit : '50mb'}));

app.use(bodyParser.urlencoded({extended:true, limit : '50mb'}));

//db
// const db = require("./app/models/user.model.js");

//initial route
app.get("/", (req , res ) => {
    res.json({message : "Welcome to Friendzone API!"})
})

require("./app/routes/auth.routes")(app);
//require("./app/routes/user.routes")(app);

//listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on ${PORT}.")
});