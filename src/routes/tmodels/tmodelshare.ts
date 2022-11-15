import cuid from "cuid";
import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../../BDconnection/connect'
import verifyjwt from '../../functions/verifyjwt'
async function tmodelshare(server: FastifyInstance){
    server.post('/', async (req, reply)=> {

        const data: any = await req.body
        const header: any = req.headers
        const id = String(cuid())
        const userid = verifyjwt(header) 

        let query = "INSERT INTO user_text_model (id, id_user, id_text_models) VALUES ('"+String(cuid())+"', '"+userid+"','"+id+"')"
        await sequelize.query(query, { type: QueryTypes.INSERT })
        
        reply.send({status: "success"})
    })
}

export default tmodelshare