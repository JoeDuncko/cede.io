var towerBase = {
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
};

// make this available to our users in our Node applications
module.exports = towerBase;
