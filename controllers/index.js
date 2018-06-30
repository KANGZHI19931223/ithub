// 引入moment模块
const moment = require('moment');
// 加载modules中的topic模块(在数据库中查询话题数据,返回页面)
const topicModule = require('../modules/topic');

exports.showIndex = (req, res) => {

	topicModule.getTopics((err, data) => {
		// (1) 数据库查询报错
		if (err) {

			console.log(err);

			return res.send('服务器错误')

		}
		// (2) 数据库查询没有报错
		// ① 数据库中没有数据
		if (data.length === 0) {

			res.render('index.html', {

				msg: '暂时没有话题数据',

				session: req.session.user

			})

		} else {

			res.render('index.html', {

				topics: data,

				moment,
	
				session: req.session.user
	
			});	

		}
		
	})

}