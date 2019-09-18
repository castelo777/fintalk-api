const credentials = require("./credentials")
const {Strategy, ExtractJwt} = require('passport-jwt');
const mongoose = require('mongoose');
const User = require("../app/models/user")

module.exports = (passport) => {

    let options = {}

    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = credentials.secret

    passport.use(new Strategy(options, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.sub}).then((err, user) => {
            if(err)return done(err, null)

            if(user)return done(null, user)
            else return done(err, null)
        }).catch(err => console.log(err))
    }))

}