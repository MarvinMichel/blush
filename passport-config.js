const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const Users = require('./routes/Schemas/users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      await Users.findOne({ email: email }, (err, user) => {
        console.log(0)
        if (err) {
          console.log('Something went wrong');
          return done(err);
        }
        if (!user) {
          console.log(1);
          return done(null, false, { message: 'No user with that email found' });
        }
        if (!user.verifyPassword(password)) {
          console.log(2);
          return done(null, false, { message: 'Incorrect password' });
        }
        console.log(3);
        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    console.log(4);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await Users.findById(id, (err, user) => {
      done(err, user);
    });
  });
};