function Snake(game, spriteKey, x,y){
  this.game = game
  //create an array of snakes in the game object and add this snake
    if (!this.game.snakes) {
        this.game.snakes = [];
    }
    this.game.snakes.push(this);
    this.snakeLength = 0;
    this.spriteKey = spriteKey;

    //various quantities that can be changed
    this.scale = 0.6;
    this.speed = 120;
    this.rotationSpeed = 40;

    //initialize groups and arrays
 this.collisionGroup = this.game.physics.p2.createCollisionGroup();  //Idk...what is this?
 this.sections = [];
 //the head path is an array of points that the head of the snake has
 //traveled through
 this.headPath = [];
 this.food = []; //all the food which has been collected.

 this.preferredDistance = 17 * this.scale;
   this.queuedSections = 0;

   this.sectionGroup = this.game.add.group();
   //add the head of the snake
   this.head = this.addSectionAtPosition(x,y);
   this.head.name = "head";
   this.head.snake = this;

   this.lastHeadPosition = new Phaser.Point(this.head.body.x, this.head.body.y);
   //add 30 sections behind the head
   this.initSections(30);

   this.onDestroyedCallbacks = [];
   this.onDestroyedContexts = [];
}

addSectionAtPosition: function(x, y) {
    //initialize a new section
    var sec = this.game.add.sprite(x, y, this.spriteKey);
    this.game.physics.p2.enable(sec, this.debug);
    sec.body.setCollisionGroup(this.collisionGroup);
    sec.body.collides([]);
    sec.body.kinematic = true;

    this.snakeLength++;
    this.sectionGroup.add(sec);
    sec.sendToBack();
    sec.scale.setTo(this.scale);

    this.sections.push(sec);

    //add a circle body to this section
    sec.body.clearShapes();
    sec.body.addCircle(sec.width*0.5);

    return sec;
}
