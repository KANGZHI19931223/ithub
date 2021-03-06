// 引入modules中的topic.js 包
const topicCtrl = require('../modules/topic');

const categoryCtrl = require('../modules/category');

// 渲染发布话题页面
exports.showTopicCreate = (req, res) => {

	categoryCtrl.getCategory((err, data) => {

		if (err) {

			return res.send('服务器错误');
			
		}

		res.render('topic/create.html', {

			msg: data,

			session: req.session.user

		});

	})

};

// 处理发布话题请求
exports.handleTopicCreate = (req, res) => {
	// (1) 判断是否存在session
	// 若session不存在,此种写法是没有办法完成数据提交的
	if (!req.session.user) {

		return res.json({

			code: 403,

			msg: '登录已过期, 请重新登陆'

		});

	}

	// (2) 验证用户输入是否完整
	if (!req.body.title || !req.body.content) {

		return res.json({

			code: 404,

			msg: '请输入完整内容'

		})

	}

	// (3) 数据库插入内容

	req.body.userId = req.session.user.id;

	req.body.createdAt = new Date();

	topicCtrl.createTopic(req.body, (err, isOk) => {
		// 由于此处的前端使用ajax发送请求,所以返回数据都以接口的形式返回
		if (err) {

			return res.send('服务器内部错误');

		}

		if (isOk) {

			res.json({

				code: 200,

				msg: '添加话题成功'

			})

		} else {

			res.json({

				code: 401,

				msg: '添加话题失败'

			})

		}

	})

};

// 渲染话题详情页面
exports.showTopicId = (req, res) => {
	// (1)获取动态路由传递的id
	const id = req.params.topicID;

	// (2)判断获取到的id是否符合要求

	if (isNaN(id)) {
		// 不是数字类型
		return res.send('参数不符合要求');

	}

	// id是数字类型
	// (3) 调用数据库操作模块中的getTopicById方法查询数据
	topicCtrl.getTopicById(id, (err, data) => {

		if (err) {

			return res.send('服务器内部错误');

		}
		
		res.render('topic/show.html', {

			data,

			session: req.session.user

		})

	})

};

// 渲染编辑话题页面
exports.showEditTopic = (req, res) => {
	// (1) 获取动态路由中传递的topicid
	const id = req.params.topicID;
	
	// (2) 判断获取到的id是不是符合要求(是不是数字类型)
	if (isNaN(id)) {

		return res.send('参数不符合要求');

	}
	// (3) id符合要求的情况下 , 根据id查询数据
	topicCtrl.getTopicById(id, (err, data) => {

		if (err) {

			return res.send('服务器内部错误');

		}

		// (4) 查询所有的话题分类(页面中的分类下拉列表需要)
		categoryCtrl.getCategory((err, categories) => {

			if (err) {

				return res.send('服务器内部错误');

			}

			res.render('topic/edit.html', {

				data,

				categories,

				session: req.session.user

			})

		})

	})
	

};

// 处理编辑话题请求
exports.handleEditTopic = (req, res) => {

	// 1 调用module模块中的updateTopicById更新话题的方法
	topicCtrl.updateTopicById(req.body, (err, isOk) => {

		if (err) {

			return res.send('服务器内部错误');
			
		}

		if (isOk) {

			res.json({

				code: 200,

				msg: '修改成功'

			})

		} else {

			res.json({

				code: 401,

				msg: '修改话题失败'

			})

		}

	})

};

// 处理删除话题请求
exports.handleDelTopic = (req, res) => {
	// 从动态路由中获取id
	const id = req.params.topicID;

	topicCtrl.delTopic(id, (err, isOk) => {

		if (err) {

			return res.send('服务器内部错误');

		}

		if (isOk) {

			res.redirect('/');

		} else {

			res.send('删除失败');

		}

	})

};
