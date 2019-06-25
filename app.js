const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path')

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'jintianxingqiji',
    resave: true,
    saveUninitialized: true
  })
);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/records', require('./routes/records.js'));
app.use('/addrecord', require('./routes/addrecord.js'));
app.use('/api/delete_record', require('./api/delete_record.js'));

app.get('/404', function(req, res, next){
  next();
});

app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url, layout: "layouts/err" });
    },
    json: function () {
      res.json({ error: '404 Not found' })
    },
    default: function () {
      res.type('txt').send('404 Not found')
    }
  })
});

app.use(function(err, req, res, next){
  console.log(err);
  res.status(500);

  res.format({
    html: function () {
      res.render('500', { url: req.url, layout: "layouts/err" });
    },
    json: function () {
      res.json({ error: '500 Internal Server Error' })
    },
    default: function () {
      res.type('txt').send('500 Internal Server Error')
    }
  })
});

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  //res.render('error', { error: err })
  res.render('500', { url: req.url, layout: "layouts/err" });
}

app.use(errorHandler)


const PORT = process.env.PORT || 8006;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
