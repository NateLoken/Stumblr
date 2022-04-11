const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema ({
    name: String,
    email: String,
    googleId: String,
    gender: String,
  });

  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);


module.exports = User;