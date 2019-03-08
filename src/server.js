var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var players = {};

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/snake.html');
});

app.get('/index.html',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/asset/circle.png',function(req,res){
    res.sendFile(__dirname+'/asset/circle.png');
});

app.get('/snake.css',function(req,res){
    res.sendFile(__dirname+'/css/snake.css');
});



app.get('/snake-background-21.jpg',function(req,res){
    res.sendFile(__dirname+'/css/snake-background-21.jpg');
});

io.on('connection',function(socket){
  console.log('a user has connected');

  players[socket.id] = {
    x: 0,
    y: 0,
    playerId: socket.id
  };

  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', function() {
    console.log('a user has disconnected');
    delete players[socket.id];
    io.emit('disconnect', socket.id);
  });
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});
