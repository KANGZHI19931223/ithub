const db = require('./db_helper');

exports.getCategory = (callback) => {

    db.query(

        'select * from `topic_categories`',

        (err, results) => {

            if (err) {

                return callback(err);

            }

            callback(null, results);

        }

    )

}