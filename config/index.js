const express = require("express")
const bodyParser = require("body-parser")
const load = require("consign")
const passport = require("passport")
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require("./database")()

app.use(passport.initialize())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require("method-override")())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));


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


require("./passport")(passport)

module.exports = app;

