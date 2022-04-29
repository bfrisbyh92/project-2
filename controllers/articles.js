const express = require('express');
const Article = require('../models/article-model');
const router = express.Router();


router.get('/', async (req, res) => {
const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('index.ejs', {articles: articles})
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
    if(article == null) res.redirect('/')
    res.render('../views/show.ejs', {article: article})
});

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'));

router.delete('/:id', async (req, res) => {
    await Article.findOneAndDelete({_id: req.params.id})
        res.redirect('/articles')
});

function saveArticleAndRedirect(path){
    return async (req, res) => {
    let article = req.article
        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown
    
    try {
         article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } 
    catch (err) {
        res.render(`/articles/${path}`, {article: article})
        console.error(err)
    }
    }};


module.exports = router;