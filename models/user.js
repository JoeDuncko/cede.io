var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.getUserByUsername = function(username, callback) {
    return this.find(
        {
            username: username
        },
        callback
    ).select('-password');
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;

// based on https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
