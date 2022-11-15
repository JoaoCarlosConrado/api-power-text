import { FastifyInstance } from "fastify";
import verifyjwt from "../functions/verifyjwt";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
const sequelize = require('../BDconnection/connect')

async function userput(server: FastifyInstance){
    server.put('/', async (req, res) => {
        const data: any = req.body
        const param = data.param
        const value = data.value
        const id = verifyjwt(req.headers)

        let query = "UPDATE users SET '"+param+"'='"+value+"' WHERE id='"+id+"'"
        const user = await sequelize.query(query, { type: QueryTypes.UPDATE })

        res.send({user})
    })
}

export default userput