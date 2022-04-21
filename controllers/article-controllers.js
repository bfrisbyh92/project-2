const express = require('express');
const Article = require('../models/article-model');
const app = express();
const router = express.Router();

const Message = require('../models/article-model.js');

// Get route is /home

router.get('/', async (req, res) => {
      const articles = await Article.find().sort({
      createdAt: 'desc'})
    res.render('../views/index.ejs', {articles: articles})
});

router.get('/new', (req, res) => {
    res.render('../views/new.ejs', {article: new Article()})
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById({_id: req.params.id})
    res.render('../views/edit.ejs', {article: article})
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null) res.redirect('/')
    res.render('../views/show.ejs', {article: article})
});


router.post('/', async (req, res, next) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
    } catch(err){
        res.render('/articles/new', {article: article})
        console.log(err)
    }
});

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
});



module.exports = router;