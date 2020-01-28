var express = require('express');
var router = express.Router();
var Cover = require('../models/cover');

router.post('/add', async (req, res) => {
    var cover = new Cover({
        bg_img: 'https://blog20190912.oss-cn-beijing.aliyuncs.com/wallhaven-672007-1.png'
    });
    cover.save();
    res.json({
        code: 0,
    });
})

router.post('/update/:id', async (req, res) => {
    var data = req.body;
    var id = req.params.id;
    await Cover.findOneAndUpdate({_id: id}, data);
    res.json({
        code: 0
    });
})

router.get('/', async (req, res) => {
    var cover = await Cover.findOne();
    res.json({
        code: 0,
        cover
    });
})

module.exports = router;
