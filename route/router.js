// 1 引入express模块
const express = require('express');

// 引入index的模块
const indexCtrl = require('../controllers/index');

// 引入user模块
const userCtrl = require('../controllers/user');

// 2 创建路由对象
const router = express.Router();

// 3 导出模块
module.exports = router;

router
	// 首页路由配置
	.get('/', indexCtrl.showIndex)

	// user.js路由配置
	.get('/signin', userCtrl.showSignin)

	.post('/signin', userCtrl.handleSignin)

	.get('/signup', userCtrl.showSignup)

	.post('/signup', userCtrl.handleSignup)

	.get('/signout', userCtrl.handleSignout)
