const mongoose = require('../db/connection');
const marked = require('marked');
const slugify = require('slugify');

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
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }

},{timestamps: true});
ArticleSchema.pre('validate', function(err, next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if(next) next();
    if(err) console.error(err);
})

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;