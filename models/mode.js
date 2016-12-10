var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var modeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    roundTimeSeconds: {
        type: Number,
        required: true,
    },
    playerHealth: {
        type: Number,
        required: true
    },
    resourcesPerRound: {
        type: Number,
        required: true
    },
    mapSize: {
        type: Number,
        required: true
    }
});

// the schema is useless so far
// we need to create a model using it
var Mode = mongoose.model('Mode', modeSchema);

// make this available to our users in our Node applications
module.exports = Mode;

// based on https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
