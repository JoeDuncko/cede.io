var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var enemySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    damage: {
        type: Number,
        required: true,
    },
    range: {
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
var Enemy = mongoose.model('Enemy', userSchema);

// make this available to our users in our Node applications
module.exports = Enemy;

// based on https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
