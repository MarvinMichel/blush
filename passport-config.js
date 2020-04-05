const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const server = require('./server');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      server.Users.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log('Something went wrong');
          return done(err);
        }
        if (!user) {
          console.log('Incorrect email');
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          console.log('Incorrect password');
          return done(null, false);
        }
        console.log(`The user: ${user}`);
        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    server.Users.findById(id, (err, user) => {
      done(err, user);
    })
  });
}