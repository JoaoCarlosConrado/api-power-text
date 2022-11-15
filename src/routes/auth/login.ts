import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../../BDconnection/connect'
import createJWT from '../../functions/createjwt'

async function login(server: FastifyInstance){
    server.post('/', async (req, res) => {
        const data: any = await req.body
    
        const username = data.name
        const userpass = data.pass
    
        let query = "SELECT * from users WHERE name='"+username+"'"
        const userobj: any = await sequelize.query(query, { type: QueryTypes.SELECT })
        const user = userobj[0]
        console.log(user)
        if(userpass === user.password){
            let token = createJWT(user.id, user.name, user.mail)
            res.send({auth: true, token: token, message: "sucess"})
        }else{
            res.send([{auth: false, token: null, message: "Invalid user or password"}])
        }
    })
}

export default login