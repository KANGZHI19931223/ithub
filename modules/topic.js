// topic话题相关数据库操作
const db = require('./db_helper');

// 1 查询话题topics
exports.getTopics = (callback) => {

    db.query(

        'select * from `topics`',

        (err, results) => {
            // (1) 如果数据库查询操作报错
            if (err) {

                return callback(err);

            }
            // (2) 数据库查询没有报错
            callback(null, results);

        }

    )

}