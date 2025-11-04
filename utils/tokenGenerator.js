const jwt = require("jsonwebtoken")

const jwt_token = (paylod)=>{
    const token = jwt.sign(paylod,process.env.SECRET_KEY,{expiresIn:"1hr"})
    return token
}

module.exports = jwt_token