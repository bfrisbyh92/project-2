// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const flash = require('express-flash');
// const sessions = require('express-session');
// const initializePassport = require('../passport-config')//(passport);

// initializePassport(passport,
//  email => users.find(user => user.email === email),
//  id => users.find(user => user.id === id)
//     );

// const users = [];
// const Users = require('./models/user');

// router.get('/', checkAuthenticated, (req, res) => {
//     res.render('../views/index.ejs', {firstName: req.user.firstName})
// });

// router.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('../views/login.ejs')
// });

// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//         successRedirect: '/articles',
//         failureRedirect: '/login',
//         failureFlash: true
//     }));


// router.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('../views/register.ejs')
// });


// router.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 8)
//     users.push({
//       id: Date.now().toString(),
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     res.redirect('/login')
//     console.log(users)
//   } catch {
//     res.redirect('/register')
//   }
// });

// // app.post('/register', async(err,req, res) => {
// //     try {
// //         const hashedPassword = await bcrypt.hash(req.body.password, 8)
// //             Users.create({
// //                 firstName: req.body.firstName,
// //                 lastName: req.body.lastName,
// //                 email: req.body.email,
// //                 password: hashedPassword
// //             })
// //             res.redirect('/login');
// //     }
// //     catch {
// //       res.redirect('/register');  
// //     }
// //         console.log(err)
// // });

// router.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// });

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }res.redirect('/login')
// };

//   function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// };

// // app.get('/home', (req, res) => {
// //     res.render('./views/index.ejs',{firstName: req.body.firstName})
// // });

// console.log(users)