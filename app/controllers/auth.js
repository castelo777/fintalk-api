const passport = require("passport")
const jwt = require("jsonwebtoken")
const credentials = require("../../config/credentials")

module.exports = app => {

    const model = app.models.user

    return {
        login: async (request, response) => {
            passport.authenticate('login', (err, user, info) => {
                if(err) return console.log(err)

                if(info){
                    console.log(info.message)
                    response.status(200).json({status: 200, message: info.message})
                }else{
                    request.logIn(user, async err => {
                        const userFind = await model.findOne({email: user.email})
                        const token = jwt.sign({id: userFind.email}, credentials.secret)

                        response.status(200).json({
                            auth: true,
                            token,
                            message: `Session logged.`
                        })
                    })
                }
            })
        }
    }
}