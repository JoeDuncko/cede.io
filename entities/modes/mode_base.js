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
};

// make this available to our users in our Node applications
module.exports = modeBase;
