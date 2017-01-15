//loads environment variables
var dotenv = require('dotenv');
dotenv.load();

const fs = require('fs');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');

// var sass = require('node-sass');
// sass.render(
//     {
//         file: './public/stylesheets/style.sass',
//         outputStyle: 'compressed',
//         outFile: './public/stylesheets/style.css',
//         sourceMap: true // or an absolute or relative (to outFile) path
//     },
//     function(err, result) {
//         if(err){
//             console.log('sass broke', err);
//         }
//         if(!err){
//             console.log('sass worked', result);
//
//             // No errors during the compilation, write this result on the disk
//             fs.writeFile('./public/stylesheets/style.css', result.css, function(err){
//                 if(!err){
//                     console.log('Successfully wrote style.css');
//                 }
//             });
//             fs.writeFile('./public/stylesheets/style.css.map', result.map, function(err){
//                 if(!err){
//                     console.log('Successfully wrote style.css.map');
//                 }
//             });
//         }
//
//     }
// );

var mongoose = require('mongoose');
//mongodb - this will need changed when not run locally
mongoose.connect(process.env.MONGODB_URI);

//init express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//router w/ auth support
var routes = require('./routes/index')(passport);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
