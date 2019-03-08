var width = 800;
var height = 600;
var scale = 200;

var config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

var numPlayers = 0;
var lastNumPlayers = 0;

function init() {
  game.scene.disableVisibilityChange = true;
}

function preload() {
this.load.image('ship', 'assets/circle.png');}

function create() {
  var self = this;
  this.cameras.main.setBounds(-width, -height, width, height);
  console.log("old gameworld bounds:  width: " + this.cameras.main.getBounds().width + "   height: " + this.cameras.main.getBounds().height);
  this.socket = io();
  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      console.log("players added");
      numPlayers++;
    });
  });
  this.socket.on('newPlayer', function (playerInfo) {
    console.log("new player added");
    numPlayers++;
  });
  this.socket.on('disconnect', function (playerId) {
    console.log("player disconnected");
    numPlayers--;
  });


    var circle = this.game.add.sprite(0, 0, "circle");
  this.game.physics.p2.enable(circle, false);
  //give circle sprite a circular physics body with the proper radius
  circle.body.setCircle(circle.width*0.5);
  //scale the circle up
  circle.scale.setTo(2);
  //scale up the circle's P2 physics body with the proper radius
  circle.body.data.shapes[0].radius = this.game.physics.p2.pxm(circle.width*0)
}

function update() {
  if (numPlayers != lastNumPlayers) {
    this.cameras.main.setBounds(-width - (scale * numPlayers), -height - (scale * numPlayers), width + (scale * numPlayers), height + (scale * numPlayers));
    console.log("new gameworld bounds:  width: " + this.cameras.main.getBounds().width + "   height: " + this.cameras.main.getBounds().height);
    lastNumPlayers = numPlayers;
  }
}
//we are creating API end point for leader  board

function addUUID(){
  var username = document.getElementById("userID").value
  var startAPI = {"userID" : username, "score": 0}
  // startAPI =  JSON.stringify(startAPI)
  console.log(startAPI);
}
