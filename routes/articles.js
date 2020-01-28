var express = require('express');
var router = express.Router();
var ArticleModel = require('../models/article');

/* GET home page. */
router.post('/add', function(req, res) {
    var article = new ArticleModel(req.body);
    article.save();
    res.json({
        code: 0
    })
});

router.get('/prev/:id', async (req, res) => {
    let id = req.params.id;
    let article = await ArticleModel.find({'_id': {'$lt': id}}).sort({'_id': -1})
    if(article.length === 0) {
        article = await ArticleModel.find().sort({'_id': -1})
    }
    res.json({
        code: 0,
        id: article[0]._id
    });
})

router.get('/next/:id', async (req, res) => {
    let id = req.params.id;
    let article = await ArticleModel.find({'_id': {'$gt': id}}).sort({'_id': 1})
    if(article.length === 0) {
        article = await ArticleModel.find().sort({'_id': 1})
    }
    res.json({
        code: 0,
        id: article[0]._id
    });
})

router.get('/latest', async (req, res) => {
    var articles = await ArticleModel.find().sort({'_id': -1}).limit(1);

    res.json({
        code: 0,
        article: articles[0] 
    });
});

router.get('/page/:page', async (req, res) => {
    var page = req.params.page;
    var limit = 10;
    var start = (page - 1) * limit;
    var result = await ArticleModel.find().skip(start).limit(limit).sort({'_id': -1});

    res.json({
        code: 0,
        articles: result
    })
});

router.get('/', async (req, res) => {
    var result = await ArticleModel.find().sort({'_id': -1});

    res.json({
        articles: result
    });
});

router.get('/id/:id', async (req, res) => {
    var id = req.params.id;
    var result = await ArticleModel.findOne({_id: id});

    res.json({ 
        code: 0,
        article: result
    });
});

router.post('/update/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var data = req.body;
        var result = await ArticleModel.findByIdAndUpdate(id, data);

        if(result) {
            res.json({
                code: 0,
            });
        }else {
            res.json({
                code: -1
            });
        }
    } catch (error) {
        res.json({
            code: -1
        });   
    }
})

router.post('/delete/:id', async (req, res) => {
    await ArticleModel.remove({ _id: req.params.id });

    res.json({
        code: 0,
    });
})

router.post('/batchDelete', async (req, res) => {
    var ids = req.body;
    console.log(ids);
    await ArticleModel.remove({ _id: { $in: ids } });

    res.json({
        code: 0
    });
});

router.get('/tag/:tag', async (req, res) => {
    var articles = await ArticleModel.find().sort({_id: -1});

    res.json({
        code: 0,
        articles
    })
})

module.exports = router;
