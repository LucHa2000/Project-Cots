require("dotenv").config()
const mysql = require("mysql2")
const pool = mysql.createPool({
    host: "localhost" ,
    user: "root",
    database: "final_project",
    password: "root"
})
module.exports = pool
