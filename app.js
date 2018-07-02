// 1 引包
const express = require('express');

const expressArtTemplate = require('express-art-template');

const bodyParser = require('body-parser');

const mysql = require('mysql');

const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);

const fs = require('fs');

const router = require('./route/router');

const options = require('./config');

const PORT = 3000;

const sessionStore = new MySQLStore(options);

// 2 搭建服务器
const app = express();

app.listen(PORT, () => {

	console.log('success');

})

// 配置express-art-template
app.engine('html', expressArtTemplate);

// 配置body-parser包
app.use(bodyParser.urlencoded({ extended: false }));

// 配置静态资源
app.use('/public', express.static('./public'));

app.use('/node_modules', express.static('./node_modules'));

// 配置mysql(链接池)
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : options.host,
  user            : options.user,
  password        : options.password,
  database        : options.database
});

app.use(session({
	key: 'sessionId',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// 3 挂载路由
app.use(router, (err)=> {

	console.log(err);

});

// 4 集中处理错误
app.use((err, req, res, next) => {

	if (err) {
		// 当使用错误统一处理时,在控制器中的路由回调函数中的参数中添加next参数, if(err)时, 使用return next(err)的方式将错误传出

		// 由于此项目既使用的ajax请求也是用了后端渲染页面,所以错误无法集中处理, 当使用单一方式时,错误可以很方便的集中处理

		// 1 完全使用后端查询数据库渲染页面,错误集中处理
		res.send('服务器内部错误');

		// 2 前端使用ajax请求方式发送请求时, 服务器错误在此处统一处理完成
		// res.json({

		// 	code: 500,

		// 	msg: '服务器内部错误'

		// });

	}

})

// 5 集中处理404页面
app.use((req, res, next) => {

	// 返回404页面
	fs.readFile('./views/404.html', 'utf8', (err, data) => {

		res.send(data);

	});

})




