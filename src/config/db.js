require("dotenv").config()
const mysql = require("mysql2")


const pool = mysql.createPool({
    host: "localhost" ,
    user: "root",
    database: "webchat",
    password: "luc123"
})
// let sql = "SELECT * FROM posts;"
// pool.execute(sql,function(err,result){
//     if(err) throw err
//     result.forEach((res)=>{
//         console.log(res.title)
//     })
    
// })

module.exports = pool
//module.exports = { connect };
//module.exports = pool.promise