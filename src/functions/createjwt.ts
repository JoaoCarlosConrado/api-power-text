const jwt = require('jsonwebtoken')
require ('dotenv').config()
export default function createJWT(userid: String, username: String, mail: String){
    const token = jwt.sign({ userid, username, mail}, process.env.SECRET, {
        expiresIn: 86400
    })
    return token
}

