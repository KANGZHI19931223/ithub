// 1 引包
const express = require('express');

const expressArtTemplate = require('express-art-template');

const bodyParser = require('body-parser');

const mysql = require('mysql');

const router = require('./route/router');

const PORT = 3000;

// 2 搭建服务器
const app = express();

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
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'cnode'
});




// 3 挂在路由
app.use(router);

app.listen(PORT, () => {

	console.log('success');

})