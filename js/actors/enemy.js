var Enemy = function (game,key) {
  Phaser.Sprite.call(this, game, 0, 0, key);
  this.width=80;
  this.height=80;
  this.cellX=0;
  this.cellY=0;







}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Tile;

Enemy.prototype.setPositionCell = function (cell) {
  this.cellX = cell.cellX;
  this.cellY = cell.cellY;
    var newX= cell.x+cell.width/2-this.width/2;
    var newY = cell.y+cell.height/2-this.height/2;
    var tween = this.game.add.tween(this);
    tween.to({x:newX,y:newY},150);
    tween.start();
}
