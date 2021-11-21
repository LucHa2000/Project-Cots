const db = require('../../config/db')
class Account {
    constructor(username,password,email,avatar,acc_type,acc_status) {
        this.username = username
        this.email = email 
        this.avatar = avatar
        this.password = password
        this.acc_type = acc_type
        this.acc_status = acc_status
    }
    async save (){
        // let d = new Data() 
        // let yyyy = d.getFullYear()
        // let mm = d.getMonth() + 1
        // let dd = d.getData()
        // let createAt = `${dd}-${mm}-${yyyy}`
        let sql  = `INSERT INTO ACCOUNTS (username,password,email,avatar,acc_type,acc_status)
            VALUES ( "${this.username}","${this.password}" ,"${this.email}","${this.avatar}","${this.acc_type}","${this.acc_status}")`
        return db.execute(sql)
    }   
    static findAll(){
        let sql = "SELECT * FROM  accounts"
        return sql
    }
    static findByTag(tag,value){
        let sql = `SELECT * FROM accounts Where ${tag} = "${value}"` 
        return sql
    }
}
module.exports = Account