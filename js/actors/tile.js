var Tile = function (game,key,x,y) {
  Phaser.Sprite.call(this, game, 0, 0, key);
  this.width=80;
  this.height=80;
  this.x = 180+x*this.width;
  this.y = 30+y*this.height;
  this.cellX = x;
  this.cellY = y;
  this.inputEnabled = true;
  var self = this





}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.select = function (selected) {
  console.log(this.tint);
    // this.tint=selected?0xaa0000:0xFFFFFF;

}
