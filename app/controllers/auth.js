const passport = require("passport")
const jwt = require("jsonwebtoken")
const credentials = require("../../config/credentials")
const bcrypt = require("bcrypt")

module.exports = app => {

    const model = app.models.user

    return {
        login: async (request, response) => {
            const { email, password } = request.body;
           
            try {
                const user = await model.findOne({ email })

                if (!user) return response.status(404).json({status: 404, message: "E-mail/Password are inválid"});

                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user._id, name: user.name };
                        jwt.sign(payload, credentials.secret, { expiresIn: 1800 }, async (err, token) => {
                            if (err) return response.status(500).json({ error: "Error signing token", raw: err }); 
                            await model.update({_id: user._id}, {token, last_login: new Date}, {$upsert: true})    

                            return response.json({  success: true, token: `Bearer ${token}` });
                        });      
                    } else {
                        return response.status(401).json({status: 401, message: "E-mail/Password are inválid"});
                    }
                });

            } catch (error) {
                return response.status(500).json({ status: 500, message: error })
            }
        },
        register: async (request, response) => {
            const body = request.body

            const user = await model.findOne({email: body.email})

            if(user)return response.status(500).json({status: 500, message: 'Email Address Exists in Database.'})

            let data = await model.create(body)

            if(data)return response.status(200).json({status: 200, data})
            else return response.status(500).json({status: 500, message: 'Error on creteOrUpdate user.'})
        }
    }
}