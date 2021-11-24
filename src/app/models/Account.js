const db = require('../../config/db')
class Account {
    constructor(username,acc_password,email,first_name,last_name,birthday,gender,bio,job,acc_status,acc_type_id,avatar) {
        this.username = username
        this.email = email 
        this.avatar = avatar
        this.acc_password =acc_password
        this.job = job
        this.acc_type_id = acc_type_id
        this.acc_status = acc_status
        this.first_name = first_name
        this.last_name = last_name
        this.birthday = birthday
        this.bio = bio
        this.gender = gender
    }
    async save (){
        // let d = new Data() 
        // let yyyy = d.getFullYear()
        // let mm = d.getMonth() + 1
        // let dd = d.getData()
        // let createAt = `${dd}-${mm}-${yyyy}`
      
        let sql  = `INSERT INTO ACCOUNTS 
            VALUES ( "${this.username}","${this.acc_password}" ,"${this.email}",
            "${this.first_name}","${this.last_name}","${this.birthday}",
            ${this.gender},"${this.bio}","${this.job}",
            ${this.acc_status},${this.acc_type_id},"${this.avatar}" )`
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
    static findByNameLike(value){
        let sql = `SELECT * FROM AccountS WHERE username LIKE '%${value}%' and acc_type_id = 2 `
        return sql
    }
    static updateAccount(username,acc_password,email,first_name,last_name,birthday,bio,job,avatar){
       let sql= `update accounts set acc_password = "${acc_password}", email = "${email}",avatar = "${avatar}",first_name="${first_name}" 
       ,last_name="${last_name}",bio = "${bio}",birthday = "${birthday}",job = "${job}" 
       where username = "${username}"`
       return sql
    }
}
module.exports = Account