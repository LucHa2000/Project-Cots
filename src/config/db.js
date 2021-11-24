require("dotenv").config()
const mysql = require("mysql2")
const pool = mysql.createPool({
    host: "localhost" ,
    user: "cots",
    database: "webchat",
    password: "cots1234"
})
module.exports = pool
