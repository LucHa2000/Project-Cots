const db = require("../../config/db");
class Crew {
    static save(crew_name, admin, crew_title, avatar) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let create_date = `${yyyy}-${mm}-${dd}`;
        let sql = `INSERT INTO CREWS
            VALUES ( "${crew_name}","${admin}" ,"${create_date}",
            "${crew_title}","${avatar}" )`;
        return sql;
    }
    static findAll() {
        let sql = "SELECT * FROM  crews";
        return sql;
    }
    static findByTag(tag, value) {
        let sql = `SELECT * FROM crews Where ${tag} = "${value}"`;
        return sql;
    }
    static findByNameLike(value) {
        let sql = `SELECT * FROM crewS WHERE crew_name LIKE '%${value}%' `;
        return sql;
    }
    static delete(crew_name) {
            let sql = `DELETE FROM crews where crew_name= '${crew_name}'`;
            return sql;
        }
        // static updateAccount(
        //     username,
        //     acc_password,
        //     email,
        //     first_name,
        //     last_name,
        //     birthday,
        //     bio,
        //     job,
        //     avatar
        // ) {
        //     let sql = `update accounts set acc_password = "${acc_password}", email = "${email}",avatar = "${avatar}",first_name="${first_name}"
        //    ,last_name="${last_name}",bio = "${bio}",birthday = "${birthday}",job = "${job}"
        //    where username = "${username}"`;
        //     return sql;
        // }
}
module.exports = Crew;