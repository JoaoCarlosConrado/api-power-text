import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../../BDconnection/connect'

async function verifyusername(server: FastifyInstance){
    server.get('/:username', async (req, res) => {
        const param: any = req.params
        const username = param.username
        let query = "SELECT name from users WHERE name='"+username+"'"
        const user: any = await sequelize.query(query, { type: QueryTypes.SELECT })
        if(user.length === 0){
            res.send({status: "avaible"})
        }
        if(user[0].name === username){
            res.send({status: "unavaible"})
        }
    })
}

export default verifyusername