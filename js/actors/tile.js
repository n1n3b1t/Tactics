
var Tile = function (game,x,y) {
  Phaser.Group.call(this,game);
  this.width=80;
  this.height=80;
  this.x = 180+x*80;
  this.y = 30+y*80;
  console.log(this.x +'___' + this.y);
  this.cellX = x;
  this.cellY = y;
  this.mainSprite = this.create(0,0,"tile");
  this.mainSprite.inputEnabled = true;
  // this.add(this.mainSprite);
  this.mainSprite.width = 80;
  this.mainSprite.height =80;

  this.overlaySprite = this.create(0,0,"tile_overlay");
  this.overlaySprite.width = 80;
  this.overlaySprite.height = 80;
  this.overlaySprite.alpha=0;
  // this.add(this.overlaySprite);

  this.mainSprite.events.onInputOver.add(function () {
  this.game.add.tween(this.overlaySprite).to({alpha:1},200).start();
},this);
this.mainSprite.events.onInputOut.add(function () {
this.game.add.tween(this.overlaySprite).to({alpha:0},200).start();
},this);





}

Tile.prototype = Object.create(Phaser.Group.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.select = function (selected) {

    // this.tint=selected?0xaa0000:0xFFFFFF;

}
