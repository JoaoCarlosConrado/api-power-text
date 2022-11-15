const jwt = require('jsonwebtoken')
require ('dotenv').config()

export default function verifyJWT(header: any){
    const token = header['x-access-token']
    
    const id = jwt.verify(token, process.env.SECRET, function(err: any, decode: any){
        if (err) return {status: 500, message: "error jwt"}
        console.log(decode.userid)
        return decode.userid
    })
    return id
}

