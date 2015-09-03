var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');
var cursors,tileset,selected,prevDirection,hero;
var TacticsGame = function(){


}

TacticsGame.prototype = {

  init:function () {
    tileset = Create2DArray(8);
    this.selected = undefined;
  },
  preload:function () {
    game.load.image("tile","/img/main_tile.jpg");
    game.load.image("hero","/img/hero.png");
  },
  create:function () {
    // game.add.sprite(0,0,"tile");
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
          var sprite = game.add.existing(new Tile(game,"tile",j,i));
          tileset[j][i] = sprite;
          var self = this;
          sprite.events.onInputDown.add(function () {
            self.selectTile(this);
          },sprite);

      }
    }
    hero = new Hero(game,"hero");
    game.add.existing(hero);
    cursors = game.input.keyboard.createCursorKeys();

    this.selectTile(tileset[0][0]);
  },
  update:function () {

  },
  selectTile:function (tile) {
    if(self.selected)
      self.selected.select(false);
    self.selected = tile;
    self.selected.select(true);
    hero.setPositionCell(tile);
  }
}

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

game.state.add('Game',TacticsGame,true);
