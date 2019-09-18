const express = require("express")
const bodyParser = require("body-parser")
const load = require("consign")
const passport = require("passport")
const app = express();

require("./passport")()

app.use(passport.initialize())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require("method-override")())


load({cwd: 'app'})
    .include('models')    
    .then('controllers')
    .then('routes')
    .into(app)

app.get("*", (request, response) => {
    response.status(404).json({
        message: "Endpoint don't exists"
    })
})

module.exports = app;

