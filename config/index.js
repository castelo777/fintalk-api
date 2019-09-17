const express = require("express")
const bodyParser = require("body-parser")
const load = require("consign")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require("method-override")())

load({cwd: '../app', extensions: ['.js', '.json']})
    .include('routes')    
    .then('models')
    .then('services')
    .then('controllers')
    .into(app)

app.get("*", (request, response) => {
    response.status(404).json({
        message: "Endpoint don't exists"
    })
})

module.exports = app;

