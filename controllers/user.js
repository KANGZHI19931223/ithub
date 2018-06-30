const md5 = require('md5');

const userModule = require('../modules/user');

exports.showSignin = (req, res) => {

	// res.send('showSignin');
	res.render('signin.html');

}
exports.handleSignin = (req, res) => {

	// 1 验证邮箱
	userModule.getByEmail(req.body.email, (err, data) => {
		// (1) 数据库查询报错
		if (err) {

			console.log(err);
			return res.send('服务器错误');

		}
		// (2) 数据库查询没有报错
		// ① 数据库查询返回的数组为空(即,没有该邮箱注册)
		if (data.length === 0) {

			res.render('signin.html', {

				data: 403,

				msg: '请注册后登陆'

			});

		} else {
			// ② 数据库查询返回的数组不为空
			// <1> 判断密码是否正确
			if (data[0].password === md5(req.body.password)) {
				// 密码正确

				// -------------设置session(session中不保存用户密码)-------------
				delete data[0].password;

				req.session.user = data[0];

				res.redirect('/');

			} else {
				// 密码错误
				res.render('signin.html', {

					code: 404,

					msg: '密码错误'

				})

			}

		}

	})
	

}
exports.showSignup = (req, res) => {

	// res.send('showSignup');
	res.render('signup.html');

}

exports.handleSignup = (req, res) => {

	// 1 验证邮箱有没有重复
	userModule.getByEmail(req.body.email, (err, data) => {
		
		// (1) 如果数据库操作报错
		if (err) {

			console.log(err);
			return res.send('服务器错误');

		}
		// (2) 数据库操作没有报错
		if (data.length > 0) {
			// ① 数据库查询到数据(即邮箱冲突)
			res.render('signup.html', {

				code: 401,

				msg: '邮箱已被注册'

			});

		} else {
			// ② 数据库中没有查询到数据(即邮箱没有被注册),继续验证nickname
			// 2 验证nickname
			userModule.getByNickname(req.body.nickname, (err, data) => {
				// (1) 数据库操作报错
				if (err) {

					console.log(err);
					return res.send('服务器错误');

				}
				// (2) 数据库操作没有报错
				// ① 数据库查询返回的数据是一个数组,当数据不为空时(即nickname已被注册)
				if (data.length > 0) {

					res.render('signup.html', {

						code: 402,

						msg: '昵称已被注册'

					});

				} else {
					// ② 当返回的数组的长度是0时(nickname不冲突),执行插入数据库的操作

					// 1 将前端发送的数据中不完整的部分补全(createdAt)并将密码加密
					req.body.createdAt = new Date();

					req.body.password = md5(req.body.password);

					userModule.createUser(req.body, (err, data) => {
						// (1) 数据库插入数据报错
						if (err) {

							console.log(err);
							return res.send('服务器错误');

						}
						// (2) 插入数据库时没有报错
						if (data.affectedRows === 0) {
							// ① 当数据库返回的数据中的affactedRows=0时(即数据库插入数据失败)
							res.render('signup.html', {

								code: 501,

								msg: '注册用户失败'

							})

						} else {
							// ② affectedRows=1, 说明数据库插入数据成功(即注册成功),页面重定向到登录页
							res.redirect('/signin');

						}

					})

				}

			})

		}

	})



	// 将数据插入数据库

	

	

}

exports.handleSignout = (req, res) => {
	// 1 将session销毁(destroy)
	req.session.destroy();

	// 2 将页面重定向到首页
	res.redirect('/');

}