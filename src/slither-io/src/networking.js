var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


server.lastPlayerID = 0;


io.on('connection',function(socket){ //fired when the client connects
    console.log("connected");

    socket.on('newPlayer', function (data) {
        socket.player = {
            id: server.lastPlayerID++,
            x: data.x,
            y: data.y
        };
        socket.broadcast.emit("newPlayer", socket.player);
        socket.emit("newPlayer2", socket.player);
        console.log("yes");
        socket.emit("allPlayers", getAllPlayers(socket));
    });

    socket.on('moved', function (data) {
        var newData = {
            id: data.id,
            x: data.x,
            y:data.y
        };
        socket.broadcast.emit("moveMe", newData);
    });

    socket.on("destroyed", function (data) {
        console.log("merked");
        socket.broadcast.emit("destroyed", data)
    })


    socket.on('disconnect', function() { //fired when the client disconnects
        // console.log('a user has disconnected');
        // var xy = {
        //     x: socket.player.x,
        //     y: socket.player.y
        // }
        io.emit('disconnect', socket.player.id);
    });
});

function getAllPlayers(socket) {
    var players = []
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        //if (player != socket.player){
            players.push(player);
        //}
    });
    console.log(players)
    return players;
}

function random(l, h) {
    return Math.floor(Math.random() * (h - l) + l)
}

server.listen(process.env.PORT || 8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});
