/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const _passportLocal = require("passport-local");
const _passportJwt = require("passport-jwt");
const jwt = require('jsonwebtoken');
const connection = require('../config');

const router = express.Router();

passport.use('local', new _passportLocal.Strategy({
  usernameField: 'mail',
  passwordField: 'password',
  session: false,
}, (email, password, done) => {
  try {
    connection.query('SELECT * FROM users_app WHERE mail = ?', email, (err, results) => {
      if (err) {
        return done(err, false);
      }
      const user = results[0];
      if (!user) {
        return done(null, false);
      }
      const authPassword = bcrypt.compareSync(password, user.password);
      if (!authPassword) {
        return done(null, false);
      }
      return done(null, user);
    });
  } catch (e) {
    console.log('err', e);
  }
}));

passport.use(new _passportJwt.Strategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'plan-events.bcryptpwd',
}, (jwtPayload, cb) => cb(null, jwtPayload)
));

router.post('/', (req, res) => {
  passport.authenticate('local', (error, data) => {
    if (error) {
      return res.sendStatus(500);
    }
    if (!data) {
      return res
        .sendStatus(401);
    }
    const { password, ...user } = data;
    const token = jwt.sign(user, 'plan-events.bcryptpwd');
    connection.query('DELETE FROM check_token WHERE user = ?', user.mail, (error2) => {
      if (error2) {
        return res.sendStatus(500);
      }
      connection.query('INSERT INTO check_token (token, user) VALUES (?, ?)', [token, user.mail], (error3) => {
        if (error3) {
          return res.sendStatus(500);
        }
        return res.json({ user, token });
      });
    });
  })(req, res);
});

module.exports = router;