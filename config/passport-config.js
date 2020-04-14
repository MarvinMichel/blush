const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Users = require('../routes/Schemas/users');

// Made by Marvin
module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      await Users.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log('Something went wrong');
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'No user with that email found' });
        }

        // Bcrypt part made by Jade
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;

          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password' });
          }
        })
        // end by Jade
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await Users.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
