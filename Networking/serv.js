var express = require('express');
var socket = require('socket.io');

var app = express();

var serv = app.listen(3000);
var io = socket(serv);

io.sockets.on('connection',newConnection)

function newConnection(socket){
    console.log('new connection:'+ socket.id)

    socket.on('mouse',mouseMsg);

    function mouseMsg(data){
        console.log(data);
        socket.broadcast.emit('mouse', data);
    }
}
app.use(express.static('public'));
console.log('Get')
