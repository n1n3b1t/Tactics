var Hero = function (game,key) {
  Phaser.Sprite.call(this, game, 0, 0, key);
  this.width=80;
  this.height=80;
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
    var newX= cell.x+cell.width/2-this.width/2;
    var newY = cell.y+cell.height/2-this.height/2;
    var tween = this.game.add.tween(this);
    tween.to({x:newX,y:newY},150,Phaser.Easing.Elastic.In);
    tween.start();
}
