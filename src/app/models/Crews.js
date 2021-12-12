const db = require("../../config/db");
class Crew {
    static save(crew_name, admin, crew_title, avatar) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let create_date = `${yyyy}-${mm}-${dd}`;
        let sql = `INSERT INTO CREWS
            VALUES ( "${crew_name}","${admin}" ,"${avatar}","${create_date}",
            "${crew_title}")`;
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
}
module.exports = Crew;