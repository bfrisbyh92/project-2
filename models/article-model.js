const mongoose = require('../db/connection');
const slugify = require('slugify');


const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
        default: new Date()
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
});

ArticleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    } 
    next()
});

module.exports = mongoose.model('Article', ArticleSchema);