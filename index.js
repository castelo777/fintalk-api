
require('dotenv').config({ path: './.env' })
const app = require("./config");


app.listen(process.env.APP_PORT, () => {
    console.log(`_________________ SERVER START _________________ \n\n ${process.env.APP_HOST}`)
})