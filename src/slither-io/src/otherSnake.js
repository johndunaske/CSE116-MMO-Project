/**
 * Player of the core snake for controls
 * @param  {Phaser.Game} game      game object
 * @param  {String} spriteKey Phaser sprite key
 * @param  {Number} x         coordinate
 * @param  {Number} y         coordinate
 */
OtherSnake = function(game, spriteKey, x, y, id) {
    Snake2.call(this, game, spriteKey, x, y, id);
}

OtherSnake.prototype = Object.create(Snake2.prototype);
OtherSnake.prototype.constructor = OtherSnake;

/**
 * Add functionality to the original snake update method so that the player
 * can control where this snake goes
 */
OtherSnake.prototype.tempUpdate = OtherSnake.prototype.update;
OtherSnake.prototype.update = function(x,y) {
    var mousePosX = x;
    var mousePosY = y;
    var headX = this.head.body.x;
    var headY = this.head.body.y;
    var angle = (180*Math.atan2(mousePosX-headX,mousePosY-headY)/Math.PI);
    if (angle > 0) {
        angle = 180-angle;
    }
    else {
        angle = -180-angle;
    }
    var dif = this.head.body.angle - angle;
    this.head.body.setZeroRotation();
    //allow arrow keys to be used
    //decide whether rotating left or right will angle the head towards
    //the mouse faster, if arrow keys are not used
    if (dif < 0 && dif > -180 || dif > 180) {
        this.head.body.rotateRight(this.rotationSpeed);
    }
    else if (dif > 0 && dif < 180 || dif < -180) {
        this.head.body.rotateLeft(this.rotationSpeed);
    }

    //call the original snake update method
    this.tempUpdate();
}
