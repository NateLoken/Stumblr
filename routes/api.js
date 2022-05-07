const express = require('express')
const router = express.Router()
const Session = require('../models/sessions')

// Finds the user based their name and returns their current session id
router.get('/sessions/:user', (req, res, next) => {
  Session.find({ owner: req.params.user })
    .then((data) => {
      res.json(data[0]._id)
    })
    .catch(next)
})

// If an owner exists within the body of the request then a session with that owner is created
// and the session id is returned
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

// Uses session_id param to find the session with that unique id and then returns all the bars assiociated with it
router.get('/sessions/bars/:session_id', (req, res, next) => {
  Session.find({ _id: req.params.session_id }, 'bars')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

// Finds the session with the same id as the one in the body and adds the bar to the session using the $push function
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

// Finds the session via the id and deletes it
router.delete('/sessions/:id', (req, res, next) => {
  Session.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

// Finds the bar in the session and deletes removes from the list using the $pull function (**Note: Because each bar has a unique ID there is no worry that it would be deleted from multiple peoples sessions)
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
