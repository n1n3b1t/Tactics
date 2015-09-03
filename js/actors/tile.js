var mainSprite,overlaySprite;
var Tile = function (game,x,y) {
  Phaser.Group.call(this,game,game.world);
  this.width=80;
  this.height=80;
  this.x = 180+x*this.width;
  this.y = 30+y*this.height;
  this.cellX = x;
  this.cellY = y;
  this.inputEnabled = true;
  mainSprite = new Phaser.Sprite(game,0,0,"tile");
  mainSprite.width = this.width;
  mainSprite.height = this.height;
  this.add(mainSprite);

  overlaySprite = new Phaser.Sprite(game,0,0,"tile_overlay");
  overlaySprite.width = this.width;
  overlaySprite.height = this.height;
  this.add(overlaySprite);

//   this.events.onInputOver.add(function () {
//   this.game.add.tween(overlaySprite).to({alpha:1},200)
// },this)





}

Tile.prototype = Object.create(Phaser.Group.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.select = function (selected) {
  console.log(this.tint);
    // this.tint=selected?0xaa0000:0xFFFFFF;

}
