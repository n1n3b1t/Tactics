var Hero = function (game,key) {
  Phaser.Sprite.call(this, game, 0, 0, key);
  this.width=70;
  this.height=70;
  this.cellX=0;
  this.cellY=0;
  this.stamina=100;
  this.staminaMax=100;


}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Tile;
Hero.prototype.select = function (selected) {
  console.log(this.tint);
    this.tint=selected?0x00f000:0xFFFFFF;

}
Hero.prototype.moveToCell = function (cell,cells) {
  // for (var i = 0; i < 8; i++) {
  //   for (var j = 0; j < 8; j++) {
  //     cells[j][i]
  //   }
  // }
}
Hero.prototype.setPositionCell = function (cell) {
    var newX= cell.x+cell.width/2-this.width/2;
    var newY = cell.y+cell.height/2-this.height/2;
    var tween = this.game.add.tween(this);
    tween.to({x:newX},250);
    tween.onComplete.add(function () {
        var tween2 = this.game.add.tween(this);
        tween2.to({y:newY},250);
        tween2.start();
    },this);
    tween.start();
}
