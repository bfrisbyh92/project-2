const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
// const methodOverride = require('methodOverride');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(methodOverride('_method'));

app.set('view-engine', 'ejs');

const port = process.env.PORT || 5000;

app.get('/register', (req, res) => {
    res.render('../views/register.ejs');
})

app.get('/login', (req, res) => {
    res.render('../views/login.ejs');
})



app.listen(port, () => {
    console.log(`Your forum is running on port ${port}`)
});