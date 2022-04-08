const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create schema for session
const SessionSchema = new Schema({
  bars: [
    {
      name: String,
      location: {
        lat: Number,
        lng: Number,
      },
    },
  ],
})

// Create model for session
const Session = mongoose.model('sessions', SessionSchema)

module.exports = Session
