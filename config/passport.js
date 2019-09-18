const passport = require("passport")
const credentials = require("./credentials")
const jwtStrategy = require("passport-jwt").Strategy
const extractJwt = require("passport-jwt").ExtractJwt
const User = require("../app/models/user")

module.exports = () => {

    let options = {}

    options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = credentials.secret

    passport.use('jwt', new jwtStrategy(options, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.sub}, (err, user) => {
            if(err)return done(err, null)

            if(user)return done(null, user)
            else return done(err, null)
        })
    }))

}