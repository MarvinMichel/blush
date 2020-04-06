const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const Users = require('../routes/Schemas/users');

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
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
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