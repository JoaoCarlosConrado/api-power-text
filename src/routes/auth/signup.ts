import { FastifyInstance } from "fastify";
require ('dotenv').config()
import cuid from 'cuid'
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
import sequelize from '../../BDconnection/connect'
import createJWT from '../../functions/createjwt'

async function signup(server: FastifyInstance){
    server.post('/', async (req, res) => {
        const data: any = await req.body
        const username = data.name
        const usermail = data.mail
        const password = data.pass
        const userid = cuid()
        const mailcode = String(Math.floor(Math.random() * (999999 - 100000) + 100000))
    

        
        let query = "INSERT INTO users (id, name, mail, password, mailcode) values ('"+userid+"', '"+username+"', '"+usermail+"','"+password+"', '"+mailcode+"')"
        await sequelize.query(query, { type: QueryTypes.INSERT }).catch(error => {
            res.send({error: "mysql error"})
        })
    
        let token = createJWT(userid, username, usermail)
        res.send({signup: true, token: token})
    })
}

export default signup