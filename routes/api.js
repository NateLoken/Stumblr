const express = require('express')
const router = express.Router()
const Session = require('../models/sessions')

router.get('/sessions/:user', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Session.find({ owner: req.params.user })
    .then((data) => {
      res.json(data[0]._id)
    })
    .catch(next)
})

router.get('/', function(req, res, next) {  
  res.status(200).send("Hi, It works!")  
}); 

router.post('/sessions', (req, res, next) => {
  if (req.body.owner) {
    Session.create(req.body)
      .then((data) => res.json(data._id))
      .catch(next)
  } else {
    res.json({
      error: 'The input field is empty',
    })
  }
})

router.get('/sessions/bars/:session_id', (req, res, next) => {
  Session.find({ _id: req.params.session_id }, 'bars')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/sessions/bars', (req, res, next) => {
  if (req.body) {
    Session.updateOne(
      { _id: req.body.id },
      { $push: { bars: [req.body.bars] } }
    )
      .then((data) => {
        console.log(data)
        res.json(data)
      })

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

router.post('/sessions/bars/:bar_id', (req, res, next) => {
  Session.updateOne(
    { "bars._id": req.params.bar_id},
    { $pull: { bars: { _id: req.params.bar_id } } })
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

module.exports = router
