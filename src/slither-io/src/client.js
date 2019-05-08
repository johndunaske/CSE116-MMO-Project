var Client = {};

Client.socket = io.connect("http://localhost:8081");

Client.askNewPlayer = function (w, h,) {
    var data = {
        x: w,
        y: h
    };
    Client.socket.emit('newPlayer', data);
};

Client.playerDestroyed = function(snake) {
    var data = {
        x: snake.x,
        y: snake.y,
        id: snake.id
    };
    Client.socket.emit("destroyed", data)
};

Client.moved = function(x,y, id) {
    var data = {
        x: x,
        y: y,
        id: id
    };
    Client.socket.emit("moved", data);
}


Client.socket.on("newPlayer", function (data) {
    Game.addNewOpponent(data.id, data.x, data.y);
});

Client.socket.on("newPlayer2", function (data) {

    Game.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on("allPlayers", function (data) {
    for (var i = 0; i < data.length; i++) {
        Game.addNewOpponent(data.id, data[i].x, data[i].y);
    }
});

Client.socket.on("disconnect", function (id) {
    Game.disconnectPlayer(id);
});

Client.socket.on("moveMe", function (data) {
    Game.setXY(data.x, data.y)
});

Client.socket.on("destroyed", function (data) {
    Game.removePlayer(data);
});
