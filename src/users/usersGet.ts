import { FastifyInstance } from "fastify";
import verifyjwt from "../functions/verifyjwt";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../BDconnection/connect'

async function userget(server: FastifyInstance){
    server.get('/', async (req, res) => {
    
        const id = verifyjwt(req.headers)

        let query = "SELECT name, mail, image, isConfirmed from users WHERE id='"+id+"'"
        let user = await sequelize.query(query, { type: QueryTypes.SELECT }).catch(error => {
            res.send({error: "mysql error"})
        })

        res.send({user})
    })
}

export default userget