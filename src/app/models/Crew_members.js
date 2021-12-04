const db = require("../../config/db");
class Crew_members {
    constructor(crew_name, member_username) {
        this.crew_name = crew_name;
        this.member_username;
    }
    static save(crew_name, member_username) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let joined_date = `${yyyy}-${mm}-${dd}`;
        let sql = `INSERT INTO crew_members VALUES ( "${crew_name}","${member_username}" ,"${joined_date}")`;
        return sql;
    }
    static findAll() {
        let sql = "SELECT * FROM  crew_members";
        return sql;
    }
    static findByTag(tag, value) {
        let sql = `SELECT * FROM crew_members Where ${tag} = "${value}"`;
        return sql;
    }
    static reload(value) {
        return value;
    }
    static delete(crew_name, member_username) {
        let sql = `DELETE FROM crew_members where member_username = '${member_username}' and crew_name = '${crew_name}'`;
        return sql;
    }
}
module.exports = Crew_members;