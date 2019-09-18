const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect(process.env.APP_DATABASE, { poolSize: 15, useMongoClient:true, useNewUrlParser: true })
    mongoose.connection.on('connected', () => console.log(`____________ DATABASE CONNECTED ____________`))
    mongoose.connection.on('error', (error) => console.log(error))
    mongoose.connection.on('disconnected', () => console.log(`____________ DATABASE DISCONNECTED ____________`))
    mongoose.connection.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`____________ DATABASE DISCONNECTED BY APP ____________`)
            process.exit(0)
        })
    })
}