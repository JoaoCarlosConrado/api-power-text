import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
import sequelize from '../BDconnection/connect'
import verifyjwt from '../functions/verifyjwt'
async function tmodelget(server: FastifyInstance){
    server.get('/', async (req, res) => {

        const userid = verifyjwt(req.headers)
        console.log(userid)
        let tmodelsid: any = await sequelize.query("SELECT * FROM user_text_model WHERE id_user='"+userid+"'", { type: QueryTypes.SELECT }).catch(error => {
            res.send({error: "mysql error"})
        })
        let len = tmodelsid.length
        let tmodels: Array<any> = []
        let item: any;
        for(let i = 0;i<len;i += 1){
            item = await sequelize.query("SELECT * FROM text_models WHERE id='"+tmodelsid[i].id_text_models+"'", { type: QueryTypes.SELECT }).catch(error => {
                res.send({error: "mysql error"})
            })
            tmodels.push(item[0])
        }
        res.send({tmodels})
    })
}

export default tmodelget