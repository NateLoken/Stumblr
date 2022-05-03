const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const routes = require('./routes/api')
const session = require('express-session')
const User = require('./models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const app = express()
const port = process.env.PORT || 5000
const path = require("path");

require('dotenv').config()
// require("./models/quote");
// require("./routes/quoteRoute.js")(app);

// app.use(cors());

// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err))

// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(
  session({
    secret: 'qawsedrftg',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(bodyParser.json())
app.use('/api', routes)
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    return done(null, doc)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    // Called on successful authenication
    // Insert into database
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, async (err, doc) => {
        if (err) {
          return cb(err, null)
        }

        if (!doc) {
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
          })
          await newUser.save()
          cb(null, newUser)
        } else {
          cb(null, doc)
        }
      })
    }
  )
)

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/Login' }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    res.redirect('http://localhost:3000')
  }
)

app.get('/getuser', (req, res) => {
  res.send(req.user)
})

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send('done')
  }
})

// Serve build folder
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
