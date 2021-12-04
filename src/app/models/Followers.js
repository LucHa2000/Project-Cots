const db = require("../../config/db");
class Followers {
    static save(username, follower_username, follower_avatar) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let follow_date = `${yyyy}-${mm}-${dd}`;
        let sql = `INSERT INTO followers VALUES ( "${username}","${follower_username}" ,"${follow_date}","${follower_avatar}")`;
        return sql;
    }
    static findAll() {
        let sql = "SELECT * FROM  followers";
        return sql;
    }
    static findByTag(tag, value) {
        let sql = `SELECT * FROM followers Where ${tag} = "${value}"`;
        return sql;
    }
    static reload(value) {
        return value;
    }
    static delete(username, follower_username) {
        let sql = `DELETE FROM followers where username = '${username}' and follower_username = '${follower_username}'`;
        return sql;
    }
}
module.exports = Followers;