//schedule to update all games every minute on the 0th second
var schedule = require('node-schedule');
var Game = require('./models/game');
var PF = require('pathfinding');

var enemyCloseRange = require('./entities/enemies/enemy_close_range');
var modeSurvival = require('./entities/modes/mode_survival');

console.log('init game loop')

var gameloop = schedule.scheduleJob('0 * * * * *', function(){
    console.log("scheduled job is running")

    Game.getActiveGames(function(err, games){
        var activeGames = games;

        //for all active games
        for (var i = 0; i < activeGames.length; i++){
            //mark them as done if their base is dead
            if (activeGames[i].baseHealth === 0){
                markGameAsFinished(activeGames[i]._id);
            } else{
                //otherwise move the enemies that need moved
                for(var k = 0; k < activeGames[i].enemies.length; k++){
                    moveEnemyTowardsCenter(activeGames[i].enemies[k]);
                }
                //then add a new enemy to the board
                addNewEnemy(activeGames[i]._id);
            }
        }

    });
});

var markGameAsFinished = function(gameId){
    Game.getGameById(gameId, function (err, game){
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
};

var moveEnemyTowardsCenter = function(enemy){
    // console.log('should move enemy here');
    //use https://www.npmjs.com/package/pathfinding, already included above
};

var addNewEnemy = function(gameId){
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

    Game.getGameById(gameId, function (err, game){
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

        //iterate round number
        game[0].round += 1;

        game[0].save(function (err, updatedGame){
            if (err) {
                console.log(err);
            }
        });
    });
};

// make this available to our users in our Node applications
module.exports = gameloop;
