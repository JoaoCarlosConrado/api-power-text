import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../BDconnection/connect'
import verifyjwt from '../functions/verifyjwt'
async function tmodeldelete(server: FastifyInstance){
    server.delete('/', async (req, res)=> {

        const data: any = await req.body
        const header: any = req.headers
        const userid = verifyjwt(header) 

        let query = "DELETE from user_text_model WHERE id_text_model='"+data.id+"' and id_user='"+userid+"'"
        await sequelize.query(query, { type: QueryTypes.DELETE }).catch(error => {
            res.send({error: "mysql error"})
        })
        
        query = "DELETE from text_models WHERE id='"+data.id+"'"
        await sequelize.query(query, { type: QueryTypes.DELETE }).catch(error => {
            res.send({error: "mysql error"})
        })
        
        res.send({status: "success"})
    })
}

export default tmodeldelete