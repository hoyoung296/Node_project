const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const app = express();

app.use( bodyParser.urlencoded() );
app.use( bodyParser.json() );
app.use(cookieParser());

app.set("views","./src/views")
app.set("view engine","ejs");

const router = require("./src/routers/router")(app)
app.use("/", router);

app.use("/static", express.static(__dirname + "/public"))

app.listen(3000,()=>console.log("3000 서버 실행"))

