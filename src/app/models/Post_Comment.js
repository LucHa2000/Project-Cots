const db = require("../../config/db");
class Post_Comment {
    static save(post_id, username, comment_content, comment_status) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let mn = d.getMinutes();
        let comment_date = `${yyyy}-${mm}-${dd}-${hh}-${mn}`;
        let sql = `INSERT INTO post_comments (post_id,username, comment_content,comment_date ,comment_status)
            VALUES ( "${post_id}","${username}" ,"${comment_content}","${comment_date}",
            "${comment_status}")`;
        return sql;
    }
    static findByTag(tag, value) {
        let sql = `SELECT * FROM post_comments Where ${tag} = "${value}" order by comment_date desc`;
        return sql;
    }
    static delete(comment_id) {
        let sql = `DELETE FROM post_comments where comment_id= '${comment_id}'`;
        return sql;
    }
    static update(comment_id, value) {
        let sql = `update post_comments set comment_content   = ${value}  where comment_id = ${comment_id}`;
        return sql;
    }
}
module.exports = Post_Comment;