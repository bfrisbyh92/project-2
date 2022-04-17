if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const sessions = require('express-session');

const initializePassport = require('./passport-config');
initializePassport(passport, email => {
    return users.find(user => user.email === email)
} );

const Users = require('./models/user');

// const user = []

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(methodOverride('_method'));
app.set('view-engine', 'ejs');



const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('../views/index.ejs', {name: 'Brendan'})
});

app.get('/register', (req, res) => {
    res.render('../views/register.ejs');
});

app.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
            Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            })
            res.redirect('/login');
    }
    catch {
      res.redirect('/register');  
    }
        console.log(`Created New User // hashed password = ${hashedPassword}`);
});

app.get('/login', (req, res) => {
    res.render('../views/login.ejs');
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));



app.listen(port, () => {
    console.log(`Your forum is running on port ${port}`)
});