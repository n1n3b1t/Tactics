var Hero = function (game,key) {
  Phaser.Sprite.call(this, game, 0, 0, key);
  this.width=40;
  this.height=40;
  this.cellX=0;
  this.cellY=0;







}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Tile;
Hero.prototype.select = function (selected) {
  console.log(this.tint);
    this.tint=selected?0x00f000:0xFFFFFF;

}
Hero.prototype.setPositionCell = function (cell) {
    this.x= cell.x+cell.width/2-this.width/2;
    this.y = cell.y+cell.height/2-this.height/2;
}
