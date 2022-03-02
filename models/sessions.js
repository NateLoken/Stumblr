const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for session
const SessionSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The session text field is required'],
  },
});

// Create model for session
const Session = mongoose.model('sessions', SessionSchema);

module.exports = Session;

