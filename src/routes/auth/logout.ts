import { FastifyInstance } from "fastify";
require ('dotenv').config()
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')

async function logout(server: FastifyInstance){
    server.get('/', async (req, res) => {
        res.send({auth: false, token: null})
    })
}

export default logout