const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../config');

const router = express.Router();

router.post('/', (req, res) => {
  const { confirm_password, ...user } = req.body;
  const data = {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };
  connection.query('INSERT INTO users_app SET ?', data, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


module.exports =  router;