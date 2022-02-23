const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SessionSchema = new Schema({
	action: {
		type: String,
		required: [true, 'The session field is required'],
	},
});

// Create model for session
const Session = mongoose.model('session', SessionSchema);

module.exports = Session;
