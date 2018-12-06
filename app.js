var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const subs = require("./routes/submissions");

var app = express();
app.use(cors())
var session = require('express-session');

let mongoose = require('mongoose');
//
// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } },
//     user: 'admin', pass: 'welcome1' };

var mongodbUri ='mongodb://admin:welcome1@ds135653.mlab.com:35653/wwtdb';
// var mongodbUri = 'mongodb://ds123844.mlab.com:23844/heroku_j0mcv66c';
//var mongooseUri =require('mongodb-uri').formatMongoose(mongodbUri);
// mongoose.connect(mongodbUri,options);
mongoose.connect(mongodbUri);
let db = mongoose.connection;

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
app.use('/', indexRouter);
app.use('/users', usersRouter);


// Custom Routes
//gets
app.get('/submissions', cors(),subs.displayAll);
app.get('/listOneSubmission/:id', subs.findSubmissionById);
app.get('/findByLocation/:location', subs.findByLocation);
app.get('/all', subs.displayAllByDate);
//posts
app.post('/add-submission',subs.addSubmissions);
//puts
app.put('/update-submission/:id',subs.updateSubmission);
//deletes
app.delete('/delete-submission/:id',subs.deleteSubmission);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
