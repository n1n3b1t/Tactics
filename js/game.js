var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');
var cursors, tileset, selected, prevDirection, hero, isoGroup, heroes;
var enemies = new Array();
var TacticsGame = function() {


}

TacticsGame.prototype = {

  init: function() {
    tileset = Create2DArray(8);
    this.selected = undefined;
  },
  preload: function() {
    game.load.image("tile", "/img/tile2.png");
    game.load.image("tile_overlay", "/img/main_tile_selected.png");
    game.load.image("hero", "/img/hero.png");
    game.load.image("enemy", "/img/enemy.png");
  },
  create: function() {
    // game.add.sprite(0,0,"tile");
    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));
    isoGroup = game.add.group();
    heroes = game.add.group();

    this.spawnTiles();
    this.createHero();

    // game.iso.anchor.setTo(0.5, 0.2);
    // for (var i = 0; i < 8; i++) {
    //   for (var j = 0; j < 8; j++) {
    //       var sprite = game.add.existing(new Tile(game,j,i));
    //       tileset[j][i] = sprite;
    //       var self = this;
    //       sprite.mainSprite.events.onInputDown.add(function () {
    //         self.selectTile(this);
    //       },sprite);
    //
    //   }
    // }
    // hero = new Hero(game,"hero");
    // game.add.existing(hero);
    //
    // var enemy = new Enemy(game,"enemy");
    // enemies.push(enemy);
    // game.add.existing(enemy);
    // enemy.setPositionCell(tileset[4][4]);
    // enemy = new Enemy(game,"enemy");
    // enemies.push(enemy);
    // game.add.existing(enemy);
    // enemy.setPositionCell(tileset[6][6]);
    // this.selectTile(tileset[0][0]);
  },
  update: function() {
    isoGroup.forEach(function (tile) {
      hero.canGetToLocation(tile);
    });

  },
  selectTile: function(tile) {
    enemies.forEach(function(enemy) {
      if (enemy.cellX == tile.cellX && enemy.cellY == tile.cellY) {
        alert('attack');
      }
    });
    if (self.selected)
      self.selected.select(false);
    self.selected = tile;
    self.selected.select(true);
    hero.setPositionCell(tile);
  },
  spawnTiles: function() {
    var tile;
    for (var xx = 0; xx < 512; xx += 38) {
      for (var yy = 0; yy < 512; yy += 38) {
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)
        tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
        tile.inputEnabled = true;
        tile.anchor.set(0.5, 0);
        tile.events.onInputOver.add(function() {
          this.tint = 0x86bfda;
        }, tile);
        tile.events.onInputOut.add(function() {
          this.tint = 0xffffff;
        }, tile);
        tile.events.onInputDown.add(function() {
          var tween = this.game.add.tween(hero);
          tween.to({
            isoX: this.isoX,
            isoY: this.isoY
          }, 200, Phaser.Easing.Quadratic.InOut, true);
          tween.start();

        }, tile);
      }
    }
  },
  createHero: function() {
    hero = new Hero(game);
    heroes.add(hero);
    hero.width = 56;
    hero.height = 56;
    hero.anchor.set(0.5, 0.5);
  }

}

function Create2DArray(rows) {
  var arr = [];

  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }

  return arr;
}

game.state.add('Game', TacticsGame, true);
