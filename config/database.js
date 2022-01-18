require('dotenv').config();
const mongoose = require('mongoose');
let { config } = require('./index')
const MONGO_ATLAS = `${config.port}`

let connection;

(async () => {
    try {
        connection = mongoose.connect(MONGO_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("base de datos conectada")
    } catch (error) {
        console.log(error)
    }
})();

module.exports = { connection, mongoose }