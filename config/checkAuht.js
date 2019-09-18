const jwt = require("jsonwebtoken")
const credentials = require("./credentials")

module.exports = (request, response, next) => {
    let token = request.headers.authorization;
    

    if(!token) return response.status(401).json({auth: false, message: "Unauthorized your token is invalid, please login and try again."})
    
    token = token.replace("Bearer", "").trim()

    jwt.verify(token, credentials.secret, (err, decoded) => {
        if(err) return response.status(500).json({auth: false, message: 'Failed to authenticate token.' })
         
        request.userId = decoded.id;
        next();
    })
}