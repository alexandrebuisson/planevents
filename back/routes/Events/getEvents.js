const express = require('express');
const connection = require('../config');

const router = express.Router();

router.get('/:usermail', (req, res) => {
  const usermail = req.params.usermail;
  connection.query('SELECT *, COUNT(*) FROM users_events WHERE mail = ? GROUP BY mail, event_name, event_category, nb_guests', usermail, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
