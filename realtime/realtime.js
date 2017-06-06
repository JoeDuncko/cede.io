var realtime = function(io){
    io.on('connection', function (socket) {
        //place tower
        socket.on('createTower', function (data) {
            //TODO: make it so this places towers
            console.log('createTower', data);
        });
    });
};

module.exports = realtime;
