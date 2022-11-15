import Fastify from "fastify";
import cors from '@fastify/cors'
import signup from './routes/auth/signup'
require ('dotenv').config()
import login from "./routes/auth/login";
import logout from "./routes/auth/logout";
import mailconfirm from "./routes/auth/mailconfirm";
import tmodelget from "./tmodels/tmodelsGet";
import tmodelpost from "./tmodels/tmodelsPost";
import tmodelput from "./tmodels/tmodelsPut";
import tmodeldelete from "./tmodels/tmodelsDelete";
import userget from "./users/usersGet";
import userdelete from "./users/usersDelete";
import userput from "./users/usersPut";
import tmodelshare from "./routes/tmodels/tmodelshare";
import verifyusername from "./routes/auth/verifyusernameavaible";
import verifyusermail from "./routes/auth/verifyusermailavaible";

async function start() {

    const fastify = Fastify({
        logger: true,
    })
    
    await fastify.register(cors, {
        origin: "true",
    })

    fastify.register(require('@fastify/formbody'))
    fastify.register(signup, {prefix: '/auth/signup'})//Cadastro de usuario ok
    fastify.register(login, {prefix: '/auth/login'})//Login de usuario ok
    fastify.register(logout, {prefix: '/aurh/logout'})//Logout de usuario ok
    fastify.register(mailconfirm, {prefix: '/mailconfirm'})//confirmar email de usuario ok
    fastify.register(verifyusername, {prefix: '/verify/name'})//verificar disponibilidade de name de usuario ok
    fastify.register(verifyusermail, {prefix: '/verify/mail'})//verificar disponibilidade de email de usuario ok
    
    fastify.register(tmodelget, {prefix: '/tmodel'})//buscar modelos de texto do usuario
    fastify.register(tmodelpost, {prefix: '/tmodel'})//criar modelo de texto
    fastify.register(tmodelput, {prefix: '/tmodel'})//criar modelo de texto
    fastify.register(tmodeldelete, {prefix: '/tmodel'})//criar modelo de texto
    fastify.register(tmodelshare, {prefix: '/tmodel/share'})//criar modelo de texto

    fastify.register(userget, {prefix: '/user'})//criar modelo de texto
    fastify.register(userdelete, {prefix: '/user'})//criar modelo de texto
    fastify.register(userput, {prefix: '/user'})//criar modelo de texto
    
    

    await fastify.listen({port: process.env.PORT, host: '0.0.0.0'});
}

start()
