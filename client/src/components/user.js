const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const findOrCreate = require('mongoose-findorcreate')

// Modify this for user needs
const UserSchema = new Schema({
  googleId: { type: String, unique: true },
  googleProfile: { type: Object },
  googleAccessToken: {type: String}
});

UserSchema.index({googleId: 1}, {unique: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;