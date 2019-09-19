
require('dotenv').config({ path: './.env' })

const http = require("http")
const app = require("./config");

http.createServer(app).listen(process.env.PORT || process.env.APP_PORT, () => {
    console.log(`_______________ SERVER START ON ${process.env.APP_PORT} _______________`)
})