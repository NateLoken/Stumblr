const express = require('express');
const router = express.Router();
const Session = require('../models/sessions');
const passport = require('passport');
const User = require('../models/user')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require('dotenv').config();
const app = express();

app.use(session({
  secret: "qawsedrftg",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  
  // this whole thing needs to be refactored to using google scopes instead of google plus api
  // see here: https://developers.google.com/identity/protocols/oauth2/openid-connect#php
  // https://stackoverflow.com/questions/24442668/google-oauth-api-to-get-users-email-address
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, name: profile.displayName, gender: profile.gender, email: profile.emails}, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
});

app.get('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.clearCookie("connect.sid")
  res.redirect('/');
});

router.get('/sessions', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Session.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/sessions', (req, res, next) => {
  if (req.body.action) {
    Session.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/sessions/:id', (req, res, next) => {
  Session.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;