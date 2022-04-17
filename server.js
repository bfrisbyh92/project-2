if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
};

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

initializePassport(passport,
 email => users.find(user => user.email === email),
 id => users.find(user => user.id === id)
    );

const Users = require('./models/user');
const users = [];


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(methodOverride('_method'));
app.set('view-engine', 'ejs');



const port = process.env.PORT || 3000;

app.get('/', checkAuthenticated, (req, res) => {
    res.render('../views/index.ejs', {name: req.user.name})
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('../views/login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));


app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('../views/register.ejs')
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    users.push({
      id: Date.now().toString(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
    console.log(users)
  } catch {
    res.redirect('/register')
  }
});

// app.post('/register', async(err,req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 8)
//             Users.create({
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 email: req.body.email,
//                 password: hashedPassword
//             })
//             res.redirect('/login');
//     }
//     catch {
//       res.redirect('/register');  
//     }
//         console.log(err)
// });

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }res.redirect('/login')
};

  function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
};

console.log(users)

app.listen(port, () => {
    console.log(`Your forum is running on port ${port}`)
});




