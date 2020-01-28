var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/add', function (req, res, next) {
    console.log('add');
    var user = new UserModel({
        username: 'yang',
        password: '123'
    })

    user.save();
    res.json({
        code: 0
    })
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    let users = await UserModel.find({ username });

    if (users.length !== 0 && users[0].password === password) {
        let expired = 60 * 60 * 1;  // 1小时过期
        let token = jwt.sign({ username }, 'jwt', {
            expiresIn: expired 
        });

        res.json({
            success: true,
            token,
            expired_date: expired * 1000 + Date.now(),
            msg: "登录成功"
        });
        return;
    }


    res.json({
        success: false,
        msg: "登录失败"
    });
});

module.exports = router;