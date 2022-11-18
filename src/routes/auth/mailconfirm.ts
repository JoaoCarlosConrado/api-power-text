import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { QueryTypes } = require('sequelize');
import sequelize from '../../BDconnection/connect'

async function mailconfirm(server: FastifyInstance){
    server.post('/:mail/:code', async (req, res) => {
        const params: any = req.params
    
        let query = "SELECT mailcode from users WHERE mail='"+params.mail+"'"
        const userobj: any = await sequelize.query(query, { type: QueryTypes.SELECT })
        const user = userobj[0]
        if(params.code === user.mailcode){
            let query = "UPDATE users SET isConfirmed='true' WHERE mail='"+params.mail+"'"
            await sequelize.query(query, { type: QueryTypes.UPDATE }).catch(error => {
                res.send({error: "mysql error"})
            })
            res.send({confirm: true})
        }
        res.send({confirm: false})
    })
}

export default mailconfirm