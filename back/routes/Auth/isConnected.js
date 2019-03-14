const express = require('express');
const connection = require('../config');

const router = express.Router();

router.get('/:token', (req, res) => {
  const token = req.params.token;
  connection.query('SELECT users_app.id, users_app.mail, users_app.createdAt, users_app.name FROM users_app JOIN check_token ON check_token.user = users_app.mail WHERE token = ?', token, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;