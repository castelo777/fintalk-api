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

                },
                code: {

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

    schema.pre('save', (next) => {
        if(this.password) 
    })

    return mongoose.model('User', schema)
}