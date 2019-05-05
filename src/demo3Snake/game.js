
function Game (game){
    this.snakes = []
}

Game.prototype = {
    preload: function() {
        this.game.load.image('circle','assets/circle.png');

        //load assets
        this.game.load.image('circle','assets/circle.png');

    	this.game.load.image('background', 'assets/tile.png');


    create: function() {
    //we're accessing the parameter game from the Game function
    // var width = this.game.width;
    // var height = this.game.height;

    this.game.world.setBounds(-this.game.width, -this.game.height, this.game.width * 2, this.game.height * 2);
    this.game.stage.backgroundColor = '#444';

    //add tilesprite background
    //we're repeating tiles again and again to make a background. NOTE: Remove the background variable if not needed.
    var background = this.game.add.tileSprite(-this.game.width, -this.game.height,
        this.game.world.width, this.game.world.height, 'background');

    //initialize physics and groups
    this.game.physics.startSystem(Phaser.Physics.P2JS);

//NOTE: we might remove this line because we're already using it in the Game function
    this.game.snakes = [];

    //create player
    var snake = new Snake(this.game, 'circle', 0, 0);
    //this line is required because it's referring to snake variable above, which is a new a player.
    this.game.camera.follow(snake.head);
},

    update: function() {
    //update game components
    for (var i = this.game.snakes.length - 1; i >= 0; i--) {
        this.game.snakes[i].update();
    }
}

}
