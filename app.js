const express = require("express");
const session = require("express-session")
const config = require("./config/cookie_session/cookie_session_config")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const app = express();
const session = require("express-session")

app.use( session( config.sessionConfig ) );
app.use( bodyParser.urlencoded() );
app.use( bodyParser.json() );

app.use(cookieParser());
app.use(session(sessionConfig.sessionConfig))
const router = require("./src/routers/router")(app)
app.use("/", router);

app.set("views", "./src/views")
app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "/public"))

app.listen(3000, () => console.log("3000 서버 실행"))