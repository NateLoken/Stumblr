const express = require('express');
const router = express.Router();
const Session = require('../models/sessions');

router.get('/session', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Session.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/session', (req, res, next) => {
  if (req.body.action) {
    Session.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/session/:id', (req, res, next) => {
  Session.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;

