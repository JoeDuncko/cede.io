var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// create a schema
var gameSchema = new Schema({
    id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    ownerUser: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    round: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
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
        required: true
    },
    isGameOver: {
        type: Boolean,
        required: true
    }
});

// the schema is useless so far
// we need to create a model using it
var Game = mongoose.model('Game', gameSchema);

// make this available to our users in our Node applications
module.exports = Game;

// based on https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
