const db = require('./db_helper');
const md5 = require('md5');


exports.showSignin = (req, res) => {

	// res.send('showSignin');
	res.render('signin.html');

}
exports.handleSignin = (req, res) => {

	// res.send('handleSignin');
	// 验证邮箱
	db.query(
		'select * from `users` where `email` = ?',
		req.body.email,
		(err, results)=>{
			console.log(results);
			if(err){
				return res.send('服务器内部错误');
			}
			if(results.length === 0){
				return res.render('signin.html',{
					msg: '邮箱不正确'
				})
			}
			if(results[0].password===md5(req.body.password)){
				// 密码正确
				res.redirect('/');
			} else {
				// 密码不正确
				res.render('signin.html', {
					msg: '密码不正确'
				})
			}
		}
	)

}
exports.showSignup = (req, res) => {

	// res.send('showSignup');
	res.render('signup.html');

}
exports.handleSignup = (req, res) => {

	// res.send('handleSignup');
	// 接收前端发送的数据
	// const data = req.body;
	// data.createAt = new Date();
	// 1 验证邮箱有没有重复
	db.query(
		'select * from `users` where `email` = ?',
		req.body.email,
		(err, results) => {
			if(err) {
				return res.send('服务器内部错误');
			}
			if(results.length === 0){
				// 邮箱没有冲突
				// 验证昵称
				db.query(
					'select * from `users` where nickname = ?',
					req.body.nickname,
					(err,results)=>{
						if(err) {
							return res.send('服务器内部错误');
						}
						if(results.length > 0){
							// 昵称冲突
							res.render('signup.html',{
								msg: '昵称冲突'
							});
						} else {
							// 昵称不冲突
							// 将注册信息插入到数据库中
							// req.body.createAt = new Date();
							req.body.password = md5(req.body.password);
							db.query(

								'insert into `users` set ?',
						
								req.body,
						
								(err, results) => {
						
									if (err) {
										console.log(err);
										return res.send('服务器内部错误');
						
									}
									if (results.affectedRows === 1) {
						
										// 此处要使用重定向 , 若使用render则资源标识不会发生变化 , 依然是/signup
										res.redirect('/signin');
						
									} else {
										
										res.render('signup.html', {
											msg: '注册失败'
										});
						
									}
						
								}
						
							);
						}
					}
				)
				
			}else{
				// 邮箱冲突
				res.render('signup.html', {
					msg: '邮箱冲突'
				})
			}
		}
	)



	// 将数据插入数据库

	

	

}
exports.handleSignout = (req, res) => {

	// res.send('handleSignout');
	// res.render('signout.html');

}