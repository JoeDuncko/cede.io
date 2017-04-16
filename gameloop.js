//schedule to update all games every minute on the 0th second
var schedule = require('node-schedule');
var Game = require('./models/game');
var Pathfinding = require('pathfinding');

var enemyCloseRange = require('./entities/enemies/enemy_close_range');
var modeSurvival = require('./entities/modes/mode_survival');

console.log('init game loop');

var gameloop = schedule.scheduleJob('0 * * * * *', function(){
    console.log('scheduled job is running');

    Game.getActiveGames(function(err, activeGames){
        //for all active games
        for (var i = 0; i < activeGames.length; i++){
            //create a grid to represent this game's grid
            var grid = new Pathfinding.Grid(modeSurvival.mapSize, modeSurvival.mapSize);
            //initialize finder algorithm
            var finder = new Pathfinding.AStarFinder();

            //for each enemy, populate the grid with enemy locations - mark them as "unwalkable"
            //TODO: do this for towers too
            for(var j = 0; j < activeGames[i].enemies.length; j++){
                console.log('set up grid', activeGames[i].enemies[j].positionX, activeGames[i].enemies[j].positionY);
                grid.setWalkableAt(activeGames[i].enemies[j].positionX, activeGames[i].enemies[j].positionY, false);
            }

            //for each enemy
            for(var k = 0; k < activeGames[i].enemies.length; k++){
                //have to make a copy of the grid as running finder kills it for some reason. See docs.
                var usableCopyOfGrid = grid.clone();

                //figure out that enemy's path to the center
                var path = finder.findPath(activeGames[i].enemies[k].positionX, activeGames[i].enemies[k].positionY, 2, 2, usableCopyOfGrid);
                //note: path[0] is your current position, so path[1] is the next positon
                console.log('path', path);

                if(path.length === 0){
                    //TODO: For some reason some enemies aren't moving. Is it because they are moving backwards or something?

                    // if there is no way to move to get to the center, don't do anything
                    // intentionally left empty
                    console.log('path length is 0!')
                } else if(path[1][0] === 2 && path[1][1] === 2){
                    // TODO: this seems to be running even when it shouldn't - is diagnal on my default?

                    // else, if the enemy is already moved within range of a target
                    // (currently only the main building, hard coded at [2][2]),
                    // have it attack said target
                    activeGames[i].baseHealth = activeGames[i].baseHealth - enemyCloseRange.damage;
                    console.log('attacked main building!')
                } else if(path.length === 1){
                    console.log('THIS SHOULD NEVER HAPPEN, it means that an enemy is probably ON the base', path);
                } else{
                    // else, the enemy should move toward the target
                    console.log('should move to', path[1][0], path[1][1]);

                    //remove the enemy from the grid position it is currently at on the grid, making it walkable again
                    grid.setWalkableAt(activeGames[i].enemies[k].positionX, activeGames[i].enemies[k].positionY, true);
                    //make the grid position the enemy is going to unwalkable
                    grid.setWalkableAt(path[1][0], path[1][1], false);

                    //make the change to the enemy's position in our array
                    activeGames[i].enemies[k].positionX = path[1][0];
                    activeGames[i].enemies[k].positionY = path[1][1];

                    console.log('new position', activeGames[i].enemies[k].positionX, activeGames[i].enemies[k].positionY)
                }
            }

            //mark the game as done if their base is dead
            if (activeGames[i].baseHealth <= 0){
                activeGames[i].isGameOver = true;
            } else{
                // If the game isn't done
                // then add a new enemy to the board

                //choose x and y where enemy should spawn
                //currently only spawning in corners for no good reason
                var positionX;
                var positionY;

                if(Math.random() >= 0.5){
                    positionX = 0;
                } else{
                    positionX = modeSurvival.mapSize - 1;
                }

                if(Math.random() >= 0.5){
                    positionY = 0;
                } else{
                    positionY = modeSurvival.mapSize - 1;
                }

                //make sure it isn't where an enemy is already
                if(grid.nodes[positionX][positionY].walkable){
                    // if it isn't where an enemy is already, spawn it

                    //defaulting enemy to enemyCloseRange for now
                    //can probably do this cleaner with the "new" keyword?
                    activeGames[i].enemies.push({
                        type: enemyCloseRange.name,
                        health: enemyCloseRange.maxHealth,
                        positionX: positionX,
                        positionY: positionY
                    });
                } else{
                    // if it is where an enemy is already, just don't spawn anything, becuase we are lazy
                }

                //Add resources to your pool, based on your game type
                activeGames[i].resources += modeSurvival.resourcesPerRound;

                //iterate round number
                activeGames[i].round += 1;
            }

            activeGames[i].save(function (err, updatedGame){
                if (err) {
                    console.log(err);
                } else{
                    console.log('updated game', updatedGame);
                }
            });
        }
    });

    //Now that the game loop has run, send a socket.io message to all clients with their updated info
    //TODO
});

// make this available to our users in our Node applications
module.exports = gameloop;
