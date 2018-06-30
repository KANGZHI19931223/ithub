// 1 引包
const express = require('express');

const expressArtTemplate = require('express-art-template');

const bodyParser = require('body-parser');

const mysql = require('mysql');

const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);

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

// 3 挂在路由
app.use(router);




