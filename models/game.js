var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gameSchema = new Schema({
    ownerUsername: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    round: {
        type: Number,
        required: true,
        default: 0
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    towers: [
        {
            type: {
                type: String,
                required: true
            },
            health: {
                type: Number,
                required: true
            },
            positionX: {
                type: Number,
                required: true
            },
            positionY: {
                type: Number,
                required: true
            }
        }
    ],
    enemies: [
        {
            type: {
                type: String,
                required: true
            },
            health: {
                type: Number,
                required: true
            },
            positionX: {
                type: Number,
                required: true
            },
            positionY: {
                type: Number,
                required: true
            }
        }
    ],
    baseHealth: {
        type: Number,
        required: true
    },
    resources: {
        type: Number,
        required: true,
        default: 0
    },
    isGameOver: {
        type: Boolean,
        required: true,
        default: false
    }
});

gameSchema.statics.listGamesByUser = function(ownerUsername, callback) {
    return this.find(
        {
            ownerUsername: ownerUsername
        },
        callback
    );
};

gameSchema.statics.getGameById = function(gameId, callback) {
    return this.find(
        {
            _id: gameId
        },
        callback
    );
};

gameSchema.statics.getActiveGames = function(callback) {
    return this.find(
        {
            isGameOver: false
        },
        callback
    );
};

// the schema is useless so far
// we need to create a model using it
var Game = mongoose.model('Game', gameSchema);

// make this available to our users in our Node applications
module.exports = Game;

// based on https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
