require('dotenv').config()

const config = {
    port: process.env.MONGO_URI,
    db: process.env.DB_NAME
}


module.exports = { config }