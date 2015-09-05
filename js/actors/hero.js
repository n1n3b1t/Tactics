var Hero = function (game) {
  Phaser.Plugin.Isometric.IsoSprite.call(this,game,0,0,0,'hero');

  this.stamina=100;
  this.staminaMax=100;
  this.staminaPerMove=30;
  this.cellX=0;
  this.cellY=0;


}

Hero.prototype = Object.create(Phaser.Plugin.Isometric.IsoSprite.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.canGetToLocation =  function (tile) {

  var centerX = this.isoX;
  var centerY = this.isoY;

  var circle = new Phaser.Ellipse(centerX,centerY,(this.stamina/this.staminaPerMove)*30,(this.stamina/this.staminaPerMove)*38);
  // console.log(tile.width + " " + tile.height);
  // this.game.debug.geom(circle,"#cfffff");
  if(Phaser.Ellipse.contains(circle,tile.isoX,tile.isoY)){
    tile.tint=0x17df23;
  }else{
    tile.tint=0xffffff;
  }
}
