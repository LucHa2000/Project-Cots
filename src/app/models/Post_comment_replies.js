const db = require("../../config/db");
class Post_comment_replies {
    static save(comment_id, username, reply_content) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let mn = d.getMinutes();
        let reply_date = `${yyyy}-${mm}-${dd}-${hh}-${mn}`;
        let sql = `INSERT INTO post_comment_replies (comment_id,username, reply_content,reply_date,reply_status)
            VALUES ( "${comment_id}","${username}" ,"${reply_content}","${reply_date}",
            "1")`;
        return sql;
    }
    static findByTag(tag, value) {
        let sql = `SELECT * FROM post_comment_replies Where ${tag} = "${value}" order by reply_date desc`;
        return sql;
    }
    static delete(comment_id) {
        let sql = `DELETE FROM post_comment_replies where comment_id= '${comment_id}'`;
        return sql;
    }
}
module.exports = Post_comment_replies;