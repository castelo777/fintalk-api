const mongoose = require("mongoose")
const mongooseGuid = require("mongoose-guid")
const bcrypt = require('bcrypt')

module.exports = () => {
    const schema = mongoose.Schema({
        _id: {
            type: mongooseGuid.type, default: mongooseGuid.value
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            require: true
        },
        phones: [
            {
                number: {
                    type: String
                },
                code: {
                    type: String
                }
            }
        ],
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_ate: {
            type: Date
        },
        last_login: {
            type: Date
        },
        token: {
            type: String
        }
    }, { id: false})

    schema.set('toObject', {getters: true})
    schema.set('toJSON', {getters: true})

    schema.pre('save', function(next){
        if(!this.isModified("password")) return next()

        this.password = bcrypt.hashSync(this.password, 10)
        next()
    })

    schema.methods.comparerPassword = function(value, callback){

        return callback(null, bcrypt.compareSync(value, this.password))
    }

    return mongoose.model('User', schema)
}