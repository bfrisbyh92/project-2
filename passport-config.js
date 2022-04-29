
const mongoose = require('mongoose');

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const Users = require('./models/user');

function initialize(passport, getUserByEmail, getUserById){
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
        try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
        console.log('Logged in')
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (error) {
      return done(error)
    }
  }

  // function initialize(passport, getUserByEmail, getUserById){
  // const authenticateUser = async (email, password, done) => {
  //   const user = getUserByEmail(email)
  //       if(user == null){
  //         return done(null,false,{message: 'No User with that email exists'})
  //       }
  //   }
  //       try {
  //     if (await bcrypt.compare(password, user.password)) {
  //       return done(null, user)
  //       console.log('Logged in')
  //     } else {
  //       return done(null, false, { message: 'Password incorrect' })
  //     }
  //   } catch (error) {
  //     return done(error)
  //   }
  // }

  // module.exports = function(passport) {
  //   passport.serializeUser(function(user, done){
  //     done(null, user.id )
  //   });

  //   passport.deserializeUser(function(id, done){
  //     Users.getUserByEmail(email).then(function(user){
  //       if(user){
  //         done(null, user.email)
  //       } else {
  //         done(user.error, null)
  //       }
  //     })
  //   });
  

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize