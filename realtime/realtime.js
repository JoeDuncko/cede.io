var Game = require('../models/game');
var towerCloseRange = require('../entities/towers/tower_close_range');

var realtime = function(io){
    io.on('connection', function (socket) {
        //place tower
        socket.on('placeTower', function (gameId, selectedSpaceX, selectedSpaceY) {
            console.log('placeTower', gameId, selectedSpaceX, selectedSpaceY);

            Game.getGameById(gameId, function(err, game){
                console.log(err);
                console.log(game);
                console.log(game.towers);

                //TODO Don't let towers be placed on top of towers
                //TODO Don't let people place towers without taking a resource

                game[0].towers.push({
                    type: towerCloseRange.name,
                    health: towerCloseRange.maxHealth,
                    positionX: selectedSpaceX,
                    positionY: selectedSpaceY
                });

                game[0].save(function (err, updatedGame){
                    if (err) {
                        console.log(err);
                    } else{
                        console.log('updated game, added tower', updatedGame);
                        //TODO: make it so this forces the client to update and show the towers
                    }
                });
            });
        });
    });
};

module.exports = realtime;
