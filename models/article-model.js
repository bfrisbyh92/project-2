const mongoose = require('../db/connection');

const ArticleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }

},{timestamps: true});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;