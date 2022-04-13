const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
})

const User = new mongoose.model('User', userSchema)

module.exports = User
