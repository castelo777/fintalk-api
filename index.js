
require('dotenv').config({ path: './.env' })
//require("./config/database")()

const http = require("http")
const app = require("./config");

http.createServer(app).listen(process.env.APP_PORT, () => {
    console.log(`_______________ SERVER START ON ${process.env.APP_PORT} _______________`)
})