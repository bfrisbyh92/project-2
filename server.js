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
const UserControllers = require('./controllers/users', app  , passport);
const ArticleControllers = require('./controllers/articles', app, passport);

initializePassport(passport,
 email => users.find(user => user.email === email),
 id => users.find(user => user.id === id)
    );


const users = [];
const Users = require('./models/user');
// Right now Authentication/Login works only locally. I will refactor code   
// to use Mongodb instead and then uncomment the above line.

// Linking my static directory
app.use(express.static('public'));
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
app.use('/articles', ArticleControllers, checkNotAuthenticated);
// app.use('/users', UserControllers);
// ^^ Will refactor to store users in Mongodb


const port = process.env.PORT || 3000;

app.get('/', checkAuthenticated, (req, res) => {
    res.render('../views/index.ejs')
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('../views/register.ejs')
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('../views/login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/articles',
        failureRedirect: '/login',
        failureFlash: true
    }));

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

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

  function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
};

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }res.redirect('/login')
};


console.log(users);

// Users.sequelize.sync().then(function(){
//   app.listen(port, function(){
//     console.log("Listening on localhost: " + port)
//   })
// })

app.listen(port, () => {
    console.log(`Your forum is running on port ${port}`)
});





