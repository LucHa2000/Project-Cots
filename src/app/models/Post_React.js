const db = require("../../config/db");
class Post_React {
    static save(post_id, username, icon_id) {
        let sql = `INSERT INTO post_reacts (post_id,username,icon_id)
            VALUES ( "${post_id}","${username}" ,"${icon_id}")`;
        return sql;
    }
    static findAll() {
        let sql = "SELECT * FROM  post_reacts ";
        return sql;
    }
    static findReact(post_id, username) {
        let sql = `SELECT * FROM post_reacts Where post_id = "${post_id}" and username = "${username}"`;
        return sql;
    }
    static findReactWithPostId(post_id) {
        let sql = `SELECT * FROM post_reacts Where post_id = ${post_id}`;
        return sql;
    }
    static findReactByUsername(username) {
        let sql = `
            SELECT * FROM post_reacts Where username = "${username}"
            `;
        return sql;
    }
    static updateReact(post_id, username, icon_id) {
        let sql = `
            Update post_reacts set icon_id = "${icon_id}"
            Where post_id = "${post_id}"
            and username = "${username}"
            `;
        return sql;
    }
    static delete(post_id, username, icon_id) {
        let sql = `
            DELETE FROM post_reacts where post_id = '${post_id}'
            and username = '${username}'
            and icon_id = "${icon_id}"
            `;
        return sql;
    }
    static deleteWithPostId(post_id) {
        let sql = `
            DELETE FROM post_reacts where post_id = '${post_id}'
            `;
        return sql;
    }
    static countPostReact(post_id) {
        let sql = `
            SELECT COUNT( * ) as total FROM post_reacts where post_id = $ { post_id }
            `;
        return sql;
    }
}
module.exports = Post_React;