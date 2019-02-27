/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import connection from '../config';

const router = express.Router();

passport.use('local', new LocalStrategy({
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

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
    const token = jwt.sign(user, process.env.SECRET);
    connection.query('DELETE FROM public_token WHERE user = ?', user.mail, (error2) => {
      if (error2) {
        return res.sendStatus(500);
      }
      connection.query('INSERT INTO public_token (token, user) VALUES (?, ?)', [token, user.mail], (error3) => {
        if (error3) {
          return res.sendStatus(500);
        }
        return res.json({ user, token });
      });
    });
  })(req, res);
});

export default router;