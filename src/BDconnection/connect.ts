import { Sequelize } from "sequelize"
require ('dotenv').config()

function bdconnect(){
    const dbhost = String(process.env.DB_HOST)
    const dbname = String(process.env.DB_NAME)
    const dbuser= String(process.env.DB_USER)
    const dbpass= String(process.env.DB_PASS)
    const sequelize = new Sequelize(dbname, dbuser, dbpass, {
	host: dbhost,
        dialect: 'mysql',
        dialectOptions: {
          // Your mysql2 options here
        }
      })
    return sequelize
}
const sequelize = bdconnect()
export default sequelize