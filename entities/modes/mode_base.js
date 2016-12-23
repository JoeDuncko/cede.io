// for now we aren't going to formally extend these, but I'll use them as a base

var modeBase = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    roundTimeSeconds: {
        type: Number,
        required: true,
    },
    playerMaxHealth: {
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
};

// make this available to our users in our Node applications
module.exports = modeBase;
