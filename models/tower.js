var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var towerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    damage: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true
    },
    range: {
        type: Number,
        required: true
    }
});

// the schema is useless so far
// we need to create a model using it
var Tower = mongoose.model('Tower', towerSchema);

// make this available to our users in our Node applications
module.exports = Tower;

// based on https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
