import { FastifyInstance } from "fastify";
import verifyjwt from "../functions/verifyjwt";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../BDconnection/connect'

async function userget(server: FastifyInstance){
    server.get('/', async (req, res) => {
    
        const id = verifyjwt(req.headers)

        let query = "SELECT name, mail, image from users WHERE id='"+id+"'"
        const user = await sequelize.query(query, { type: QueryTypes.SELECT })

        res.send({user})
    })
}

export default userget