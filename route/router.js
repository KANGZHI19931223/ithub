// 1 引入express模块
const express = require('express');

// 引入index的模块
const indexCtrl = require('../controllers/index');

// 引入user模块
const userCtrl = require('../controllers/user');

// 引入topic模块
const topicCtrl = require('../controllers/topic');

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

	// topic.js话题页路由配置

	.get('/topic/create', topicCtrl.showTopicCreate)

	.post('/topic/create', topicCtrl.handleTopicCreate)
	// 展示话题详情页
	.get('/topic/:topicID', topicCtrl.showTopicId)
	// 展示修改话题页
	.get('/topic/:topicID/edit', topicCtrl.showEditTopic)
	// 处理修改话题
	.post('/topic/:topicID/edit', topicCtrl.handleEditTopic)
	// 删除话题
	.get('/topic/:topicID/delete', topicCtrl.handleDelTopic)
