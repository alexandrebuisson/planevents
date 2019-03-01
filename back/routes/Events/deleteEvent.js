const express = require('express');
const connection = require('../config');

const router = express.Router();

router.put('/:usermail', (req, res) => {

  const usermail = req.params.usermail;

  connection.query('UPDATE users_app SET nb_events = nb_events - 1 WHERE mail = ?', usermail, err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppresion d'un event");
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
