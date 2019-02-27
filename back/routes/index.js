const express = require('express');

const connection = require('./config');

const router = express.Router();


router.get('/', (req, res) => {
  connection.query('SELECT * FROM users_app', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération...');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
