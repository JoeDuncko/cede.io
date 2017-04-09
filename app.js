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

var mongoose = require('mongoose');
//mongodb - this will need changed when not run locally
mongoose.connect(process.env.MONGODB_URI);

//schedule to update all games every minute on the 0th second
var schedule = require('node-schedule');
var Game = require('./models/game');
var PF = require('pathfinding');
var enemyCloseRange = require('./entities/enemies/enemy_close_range');
var modeSurvival = require('./entities/modes/mode_survival');

schedule.scheduleJob('0 * * * * *', function(){
    console.log("scheduled job is running")

    Game.getActiveGames(function(err, games){
        var activeGames = games;

        //for all active games
        for (var i = 0; i < activeGames.length; i++){
            //mark them as done if their base is dead
            if (activeGames[i].baseHealth === 0){
                Game.getGameById(activeGames[i]._id, function (err, game){
                    if (err) {
                        console.log(err);
                    }

                    game[0].isGameOver = true;

                    game[0].save(function (err, updatedGame){
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            } else{
                //otherwise move the enemies that need moved
                for(var k = 0; k < activeGames[i].enemies.length; k++){
                    console.log('should move enemy here');
                }
                //then add a new enemy to the board

                //choose x and y where enemy should spawn
                //currently only spawning in corners for no good reason
                var positionX;
                var positionY;

                if(Math.random() >= 0.5){
                    positionX = 1;
                } else{
                    positionX = modeSurvival.mapSize;
                }

                if(Math.random() >= 0.5){
                    positionY = 1;
                } else{
                    positionY = modeSurvival.mapSize;
                }

                Game.getGameById(activeGames[i]._id, function (err, game){
                    if (err) {
                        console.log(err);
                    }

                    //defaulting enemy to enemyCloseRange for now
                    game[0].enemies.push({
                        type: enemyCloseRange.name,
                        health: enemyCloseRange.maxHealth,
                        positionX: positionX,
                        positionY: positionY
                    });

                    game[0].save(function (err, updatedGame){
                        if (err) {
                            console.log(err);
                        }else{
                            console.log('just added an enemy!');
                        }
                    });
                });
            }


        }

    });
});

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
