var realtime = function(io){
    io.on('connection', function (socket) {
        socket.emit('welcome', { hello: 'world' });

        //place tower
        socket.on('createTower', function (data) {
            console.log('createTower', data);
        });
    });
};

module.exports = realtime;
