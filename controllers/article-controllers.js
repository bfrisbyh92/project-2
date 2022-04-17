const express = require('express');
const Article = require('../models/article-model');
const app = express();
const router = express.Router();

const Message = require('../models/article-model.js');

// Get route is /home

router.get('/', (req, res) => {
        const articles = [{
            title: 'Test Article',
            createdAt: new Date(),
            description: 'Test Article Description'
        },{
            title: 'Second Test Article',
            createdAt: new Date(),
            description: 'Second Test Article Description'
        }]
    res.render('../views/partials/articles.ejs', {articles: articles})
});

router.get('/new', (req, res) => {
    res.render('../views/new.ejs')
});

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
    article = await article.save()
    res.redirect(`/articles/${article.id}`)
    } catch(err){
        res.render('/articles/new', {article: article})
    }
})



module.exports = router;