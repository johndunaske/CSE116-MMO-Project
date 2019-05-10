var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var mongojs = require('mongojs')

var db = mongojs('localhost:27017/account', ['account']);


var CheckCredentials = function(data,cb){
    db.account.find({username:data.username,password:data.password},function(err,res){
        if(res.length > 0)
        {
            cb(true);
        }
        else {
            cb(false);
        }
    });
}
var DupeUsername = function(data,cb){
    db.account.find({username:data.username},function(err,res){
        if(res.length > 0)
        {
            cb(true);
        }
        else
            {
                cb(false);
        }
    });
}
var SignUp = function(data,cb){
    db.account.insert({username:data.username,password:data.password},function(){
        cb();
    });
}
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/',express.static(__dirname + '/'));


server.lastPlayerID = 0;



io.on('connection',function(socket){ //fired when the client connects
    console.log("connected");




    socket.on('signIn',function(data){
        CheckCredentials(data,function(response){
            if(response){
                socket.emit('signInResponse',{success:true});
            } else {
                socket.emit('signInResponse',{success:false});
            }
        });
    });
    socket.on('signUp',function(data){
        DupeUsername(data,function(response){
            if(response){
                socket.emit('signUpResponse',{success:false});
            } else {
                SignUp(data,function(){
                    socket.emit('signUpResponse',{success:true});
                });
            }
        });
    });

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
