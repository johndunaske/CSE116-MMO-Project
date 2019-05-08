Game = {}

Game = {
    init: function() {

        this.game.stage.disableVisibilityChange = true;

        this.game.updateX = 0;
        this.game.updateY = 0;
    },

    preload: function() {

        //load assets
        this.game.load.image('circle','asset/circle.png');
    	this.game.load.image('shadow', 'asset/white-shadow.png');
    	this.game.load.image('background', 'asset/tile.png');

    	this.game.load.image('eye-white', 'asset/eye-white.png');
    	this.game.load.image('eye-black', 'asset/eye-black.png');

        this.game.load.image('food', 'asset/hex.png');
    },
    create: function() {
        // var width = this.game.width;
        // var height = this.game.height;

        this.game.world.setBounds(-this.game.width, -this.game.height, this.game.width*2, this.game.height*2);
    	this.game.stage.backgroundColor = '#444';

        //add tilesprite background
        var background = this.game.add.tileSprite(-this.game.width, -this.game.height,
            this.game.world.width, this.game.world.height, 'background');

        //initialize physics and groups
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.foodGroup = this.game.add.group();
        this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //add food randomly
        for (var i = 0 ; i < 100 ; i++) {
            this.initFood(Util.randomInt(-this.game.width, this.game.width), Util.randomInt(-this.game.height, this.game.height));
        }

        this.game.snakes = [];

        //create player
        var randX = Math.floor(Math.random() * this.game.width);
        var randY = Math.floor(Math.random() * this.game.width);

        // var newPlayer = {
        //     id: 0,
        //     snake: new PlayerSnake(this.game, 'circle', randX, randY, )
        // };
        // this.game.snakes.push(newPlayer)
        // this.game.camera.follow(newPlayer.snake.head);
        Client.askNewPlayer(randX, randY);

        //initialize snake groups and collision

        for (var i = 0 ; i < this.game.snakes.length ; i++) {
            var snake = this.game.snakes[i];
            // snake["snake"].head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
            // snake["snake"].head.body.collides([this.foodCollisionGroup]);
            // //callback for when a snake is destroyed
            // snake.snake.addDestroyedCallback(this.snakeDestroyed, this);
            console.log("bo")
        }
    },
    /**
     * Main update loop
     */
    update: function() {
        //update game components
        //console.log(this.game.snakes)
        for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
            //console.log(this.game.snakes[i])
            if (this.game.snakes[i] != null) {
                this.game.snakes[i]["snake"].update(this.game.updateX, this.game.updateY);
            }

        }
        for (var i = this.foodGroup.children.length - 1 ; i >= 0 ; i--) {
            var f = this.foodGroup.children[i];
            f.food.update();
        }
    },
    /**
     * Create a piece of food at a point
     * @param  {number} x x-coordinate
     * @param  {number} y y-coordinate
     * @return {Food}   food object created
     */
    initFood: function(x, y) {
        var f = new Food(this.game, x, y);
        f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
        this.foodGroup.add(f.sprite);
        f.sprite.body.collides([this.snakeHeadCollisionGroup]);
        return f;
    },
    snakeDestroyed: function(snake) {
        //place food where snake was destroyed
        console.log("id: " + snake.id);
        Client.playerDestroyed(snake);
        for (var i = 0 ; i < snake.headPath.length ;
        i += Math.round(snake.headPath.length / snake.snakeLength) * 2) {
            this.initFood(
                snake.headPath[i].x + Util.randomInt(-10,10),
                snake.headPath[i].y + Util.randomInt(-10,10)
            );
        }
    },

    addNewPlayer: function (id,x,y) {
        console.log("adding new pLyaer")
        var newPlayer = {
            id: id,
            snake: new PlayerSnake(this.game, "circle", x, y, id)
        };
        this.game.camera.follow(newPlayer.snake.head);
        this.game.snakes.push(newPlayer);
        newPlayer.snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
        newPlayer.snake.head.body.collides([this.foodCollisionGroup]);
        //callback for when a snake is destroyed
        newPlayer.snake.addDestroyedCallback(this.snakeDestroyed, this);
    },

    addNewOpponent: function(id, x, y) {
        var newPlayer = {
            id: id,
            snake: new OtherSnake(this.game, "circle", x, y, id)
        };
        this.game.snakes.push(newPlayer);
        newPlayer.snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
        newPlayer.snake.head.body.collides([this.foodCollisionGroup]);
        //callback for when a snake is destroyed
        newPlayer.snake.addDestroyedCallback(this.snakeDestroyed, this);
    },
    
    removePlayer: function (data) {
        for (var i = 0; i < this.game.snakes.length - 1; i++) {
            if (this.game.snakes[i].id == data.id) {
                delete this.game.snakes[i];
            }
        }
    },

    disconnectPlayer: function (id) {
        for (var i = 0; i < this.game.snakes.length - 1; i++) {
            if (this.game.snakes[i]["snake"].id == id) {
                delete this.game.snakes[i];
            }
        }
    },
    setXY: function (x,y) {
        this.game.updateX = x;
        this.game.updateY = y;
    }
};
