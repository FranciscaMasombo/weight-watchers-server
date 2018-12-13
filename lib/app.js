'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var subs = require('./routes/submissions');
var users = require('./routes/auth.js');
var app = express();

var session = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');
var mongodbUri = 'mongodb://admin:welcome1@ds135653.mlab.com:35653/wwtdb';
mongoose.connect(mongodbUri, { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'botnyuserdetails', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);

function login(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send('logged in or Singup');
    }
}

// Custom Routes
//gets
app.get('/listSubmissions', subs.displayAll);
app.get('/listOneSubmission/:id', subs.findSubmissionById);
app.get('/findByLocation/:location', subs.findByLocation);
//posts
app.post('/add-submission', subs.addSubmissions);
//puts
app.put('/update-submission/:id', subs.updateSubmission);
//deletes
app.delete('/delete-submission/:id', subs.deleteSubmission);

app.post('/SignUp', users.SignUp);
/// Endpoint to login

app.post('/login', // wrap passport.authenticate call in a middleware function
function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', { session: false }, function (error, user, info) {
        // this will execute in any case, even if a passport strategy will find an error
        // log everything to console
        console.log(error);
        console.log(user);
        console.log(info);

        if (error) {
            res.status(401).send(error);
        }if (!user) {
            res.status(401).send(info);
        }req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(info);
        }); //res.status(401).send(info);
    })(req, res);
},
// function to call once successfully authenticated
function (req, res) {
    res.status(200).send('logged in!');
});
// Endpoint to logout
app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send('logged out!');
    res.send(null);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000000 }
}));
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;