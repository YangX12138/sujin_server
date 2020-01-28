var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var OSS = require('ali-oss');

var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4FoPgj9QDPYWMUakALZ2',
    accessKeySecret: 'ujgGRz3bGmxOHOzeMZLhIMpYng6A6y',
    bucket: 'blog20190912',
});

/* GET home page. */
router.get('/', function(req, res) {
    res.json({
        code: 0
    });
});

router.post('/thumbnail', async (req, res) => {
    var form = new formidable();

    form.parse(req, async (err, fields, files) => {
        let result = await client.put(files.avatar.name, files.avatar.path);
        path = result.url;
        res.json({
            code: 0,
            path
        });
    });
});

router.post('/music', async (req, res) => {
    var form = new formidable();

    form.parse(req, async (err, fields, files) => {
        let result = await client.put(files.music.name, files.music.path);
        let path = result.url;
        res.json({
            code: 0,
            path,
            name: files.music.name
        });
        return;
    });
})

module.exports = router;
