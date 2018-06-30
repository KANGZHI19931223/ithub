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

            code: 200,

            msg: data

        });

    })

};

// 处理发布话题请求
exports.handleTopicCreate = (req, res) => {
    // (1) 先获取发布话题的内容
    const topic = req.body;

    topicCtrl.createTopic(topic, () => {



    })

};

// 渲染话题详情页面
exports.showTopicId = (req, res) => {

    res.send('showTopicId');

};

// 渲染编辑话题页面
exports.showEditTopic = (req, res) => {

    res.send('showEditTopic');

};

// 处理编辑话题请求
exports.handleEditTopic = (req, res) => {

    res.send('handleEditTopic');

};

// 处理删除话题请求
exports.handleDelTopic = (req, res) => {

    res.send('handleDelTopic');

};
