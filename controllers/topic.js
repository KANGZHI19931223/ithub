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

            return res.json({

                code: 400,

                msg: '服务器错误'

            });

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
