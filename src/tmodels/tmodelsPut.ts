import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../BDconnection/connect'
import verifyjwt from '../functions/verifyjwt'
async function tmodelput(server: FastifyInstance){
    server.put('/', async (req, reply)=> {

        const data: any = await req.body
        const header: any = req.headers
        const userid = verifyjwt(header) 

        let query = "UPDATE text_models title='"+data.title+"', content='"+data.content+"' WHERE id='"+data.id+"'"
        await sequelize.query(query, { type: QueryTypes.UPDATE })
        
        reply.send({status: "success"})
    })
}

export default tmodelput