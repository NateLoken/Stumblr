const express = require('express')
const router = express.Router()
const Session = require('../models/sessions')

router.get('/sessions', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Session.find({}, 'bars')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/sessions', (req, res, next) => {
  if (req.body) {
    Session.create(req.body)
      .then((data) => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: 'The input field is empty',
    })
  }
})

router.post('/sessions/bars', (req, res, next) => {
  if (req.body) {
    Session.updateOne(
      { _id: req.body.id },
      { $push: { bars: [req.body.bars] } }
    )
      .then((data) => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: 'The input field is incorrect',
    })
  }
})

router.delete('/sessions/:id', (req, res, next) => {
  Session.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router