const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Defines user Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
})

const User = new mongoose.model('User', userSchema)

module.exports = User
