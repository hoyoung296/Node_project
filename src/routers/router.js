module.exports = (app) => {
    const bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded())
 
    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.render("main")
    })

    return router;
}