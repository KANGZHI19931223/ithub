// 此模块中单纯处理有关user的服务器操作
const db = require('./db_helper');

const md5 = require('md5');
// 查询相关
// 1 根据email查询
exports.getByEmail = (email, callback) => {

    db.query(

        'select * from `users` where `email` = ?',

        email,
        // 错误优先的原则
        (err, results) => {
            // (1) 有错误信息时
            if (err) {
                // 使用回调函数处理错误信息
                return callback(err);

            }
            // (2) 没有错误的情况, 直接将查询的结果传递给处理函数处理(包括查询结果为空和不为空的情况)
            callback(null, results);

        }

    )

}

// 2 根据nickname查询
exports.getByNickname = (nickname, callback) => {

    db.query(

        'select * from `users` where `nickname` = ?',

        nickname,

        (err, results) => {
            // (1) 存在错误的情况
            if (err) {

                return callback(err);

            }
            // (2) 没有错误的情况,直接将结果返回个回调函数处理
            callback(null, results);

        }

    )

}



// 2 插入相关
exports.createUser = (user, callback) => {

    db.query(

        'insert into `users` set ?',

        user,

        (err, results) => {

            if (err) {

                return callback(err);

            }

            callback(null, results);

        }

    )

}