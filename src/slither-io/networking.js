var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/',express.static(__dirname + '/'));


server.lastPlayerID = 0;



io.on('connection',function(socket){ //fired when the client connects
    console.log("connected");



    socket.on('signIn',function(data){
        if(data.username === 'bob'&& data.password ==='asd'){
            socket.emit('signInResponse',{success:true});
        }
        else{
            socket.emit('signInResponse',{success:false});
        }
    })

    socket.on('newPlayer', function (data) {
        console.log('hello');
        socket.player = {
            id: server.lastPlayerID++,
            x: data.x,
            y: data.y
        };
        socket.broadcast.emit("newPlayer", socket.player);
        socket.emit("newPlayer2", socket.player);
        console.log("yes");
        socket.emit("allPlayers", getAllPlayers());
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
        var newData = {
            id: data.id,
            x: data.x,
            y:data.y
        };
        socket.broadcast.emit("destroyed", newData)
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

function getAllPlayers() {
    var players = []
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        //if (player != socket.player){
            players.push(player);
        //}
    });
    console.log(players);
    return players;
}

function random(l, h) {
    return Math.floor(Math.random() * (h - l) + l)
}

server.listen(process.env.PORT || 8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});
