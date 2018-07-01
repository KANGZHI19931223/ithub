// topic话题相关数据库操作
const db = require('./db_helper');

// 1 查询全部话题topics
exports.getTopics = (callback) => {

    db.query(

        'select * from `topics` order by `createdAt` desc',

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

// 2 增加话题
exports.createTopic = (topic, callback) => {

    db.query(

        'insert into `topics` set ?',

        topic,

        (err, results) => {

            if (err) {

                return callback(err);

            }
            
            if (results.affectedRows > 0) {
                // 数据库添加成功
                callback(null, true);

            } else {
                // 数据库添加失败
                callback(null, false);

            }

        }

    )

}

// 3 删除话题
exports.editTopic = (id, callback) => {

    db.query(

        'delete form `topics` where `id` = ? ',

        id,

        (err, results) => {

            if (err) {

                return callback(err);

            }

            if (results.affectedRows > 0) {

                callback(null, true);

            } else {

                callback(null, false);

            }

        }

    )

}

// 4 根据id查询话题详情
exports.getTopicById = (id, callback) => {

    db.query(

        'select * from `topics` where `id` = ?',

        id,

        (err, results) => {

            if (err) {

                return callback(err);

            }

            if (results.length > 0) {
                // 如果查询到数据时(肯定是只有一条)将这一条数据返回
                callback(null, results[0]);

            } else {

                callback(null, null);

            }

        }


    )

}

// 5 根据id更新话题topic
exports.updateTopicById = (topic, callback) => {

    db.query(

        'update `topics` set `title` = ?, `content` = ?, `categoryId` = ?,  where `id` = ?',

        [topic.title, topic.content, topic.categoryId, topic.id],

        (err, results) => {

            if (err) {

                return callback(err);

            }

            if (results.affectedRows > 0) {

                callback(null, true);

            } else {

                callback(null, false);

            }

        }

    )

}