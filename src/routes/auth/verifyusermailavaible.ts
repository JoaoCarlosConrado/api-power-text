import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../../BDconnection/connect'

async function verifyusermail(server: FastifyInstance){
    server.get('/:mail', async (req, res) => {
        const param: any = req.params
        const usermail = param.mail
        let query = "SELECT mail from users WHERE mail='"+usermail+"'"
        const user: any = await sequelize.query(query, { type: QueryTypes.SELECT }).catch(error => {
            res.send({error: "mysql error"})
        })
        if(user.length === 0){
            res.send({status: "avaible"})
        }
        if(user[0].mail === usermail){
            res.send({status: "unavaible"})
        }
        
    })
}

export default verifyusermail