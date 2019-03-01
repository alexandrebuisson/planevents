const express = require('express');
const connection = require('../config');

const router = express.Router();

router.put('/:usermail', (req, res) => {

  const usermail = req.params.usermail;

  connection.query('UPDATE users_app SET nb_events = nb_events + 1 WHERE mail = ?', usermail, err => {

    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/', (req, res) => {
  const { collapsed, visible, ...formData } = req.body;
  connection.query('INSERT INTO users_events SET ?', formData, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});
module.exports = router;

// GET SELECT COUNT(*) FROM users_events WHERE mail = 'joel@test.fr'  OUTPUT : nombre de fois que le mail est dans la bdd ex: 2;
// GET ALL occurences where mail = usermail --> SELECT *, COUNT(*) FROM users_events WHERE mail = 'buisson.alexandre@orange.fr' GROUP BY mail, event_name, event_category, nb_guests
