const db = require("../../config/db");
class Post {
    static save(username, post_content, post_status, post_img, userpost_img) {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let mn = d.getMinutes();
        let post_date = `${yyyy}-${mm}-${dd}-${hh}-${mn}`;
        let sql = `INSERT INTO posts (username,post_date,post_content,post_status,post_img,userpost_img)
            VALUES ( "${username}","${post_date}" ,"${post_content}","${post_status}",
            "${post_img}","${userpost_img}")`;
        return sql;
    }
    static findAll() {
        let sql = "SELECT * FROM  posts Order by post_content ASC";
        return sql;
    }
    static findByTag(tag, value) {
        let sql = `SELECT * FROM posts Where ${tag} = "${value}" order by post_date desc`;
        return sql;
    }
    static findPeopleFollow(username) {
        let sql = `select * from posts
        where username in (select follower_username from followers where username = "${username}") or username = "${username}"
        order by post_date desc
        `;
        return sql;
    }
    static delete(username) {
        let sql = `DELETE FROM posts where username= '${username}'`;
        return sql;
    }
}
module.exports = Post;