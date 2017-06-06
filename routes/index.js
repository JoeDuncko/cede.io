var express = require('express');
var router = express.Router();

var Game = require('../models/game');
var User = require('../models/user');

// var survivalMode = require('../entities/modes/mode_survival');

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};

module.exports = function(passport) {

    /* GET login page. */
    router.get('/', function(req, res) {
        //if logged in, redirect to game
        if(req.user){
            res.redirect('/game');
        }else{
            // Otherwise, display the Login page with any flash message, if any
            res.render('index', {
                title: 'cede.io',
                message: req.flash('message')
            });
        }
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/game',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/register', function(req, res) {
        //if logged in, redirect to game
        if(req.user){
            res.redirect('/game');
        }else{
            res.render('register', {
                title: 'register | cede.io',
                message: req.flash('message')
            });
        }
    });

    /* Handle Registration POST */
    router.post('/register', passport.authenticate('register', {
        successRedirect: '/game',
        failureRedirect: '/register',
        failureFlash: true,
    }));

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* GET Game Page */
    router.get('/game', isAuthenticated, function(req, res) {
        res.render('game', {
            user: req.user
        });
    });

    /* GET game list as JSON. */
    router.get('/game/list', isAuthenticated, function(req, res) {
        res.setHeader('Content-Type', 'application/json');

        Game.listGamesByUser(req.user.username, function(err, games){
            res.send(JSON.stringify(games));
        });
    });

    /* GET user profile as JSON. Accepts username. */
    router.get('/game/user/:username', isAuthenticated, function(req, res) {
        res.setHeader('Content-Type', 'application/json');

        User.getUserByUsername(req.params.username, function(err, user){
            res.send(JSON.stringify(user));
        });
    });

    /* POST create game as JSON. Accepts mode. Should accept an array of usernames too in the future. */
    router.post('/game/create', isAuthenticated, function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        //will wanna rewrite how this works to make baseHealth is determined by mode
        var newGame = new Game({
            ownerUsername: req.user.username,
            mode: 'Survival',
            baseHealth: 10,
        });
        newGame.save(function (err) {
            if (err) {
                console.log('err', err);
            }
        });

        res.send(JSON.stringify(newGame));

    });

    /* GET game endpoint as JSON. */
    /* This sets up the game - from here realtime.js takes over to convey events in real time between clients */
    router.get('/game/:gameId', isAuthenticated, function(req, res) {
        res.setHeader('Content-Type', 'application/json');

        Game.getGameById(req.params.gameId, function(err, game){
            res.send(JSON.stringify(game));
        });
    });

    /* GET game review endpoint as JSON. Accept gameId. */
    router.get('/game/:gameId/review', isAuthenticated, function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: req.params }));
    });

    return router;
};
