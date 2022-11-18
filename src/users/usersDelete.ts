import { FastifyInstance } from "fastify";
import verifyjwt from "../functions/verifyjwt";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
const sequelize = require('../BDconnection/connect')

async function userdelete(server: FastifyInstance){
    server.delete('/', async (req, res) => {
    
        const id = verifyjwt(req.headers)

        let query = "DELETE from users WHERE id='"+id+"'"
        const user = await sequelize.query(query, { type: QueryTypes.DELETE }).catch((error: any) => {
            res.send({error: "mysql error"})
        })

        res.send({user})
    })
}

export default userdelete