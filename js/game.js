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
            self.selected.select(false);
            self.selected = this;
            self.selected.select(true);
            hero.setPositionCell(this);
          },sprite);

      }
    }
    hero = new Hero(game,"hero");
    game.add.existing(hero);
    cursors = game.input.keyboard.createCursorKeys();
    this.selected =tileset[0][0];
  },
  update:function () {
    if (cursors.right.isDown && prevDirection!='right')
    {
      this.selectTile('right');
    }
    else if (cursors.left.isDown && prevDirection!='left')
    {
        this.selectTile('left');
    }
    else if (cursors.up.isDown && prevDirection!='up')
    {
        this.selectTile('up');
    }
    else if (cursors.down.isDown && prevDirection!='down')
    {
        this.selectTile('down');
    }
  },
  selectTile:function (direction) {
    console.log(direction);
    var unselect = this.selected;
    prevDirection = direction;
    if(direction==='right'){
      if(this.selected.cellX<8){
        this.selected = tileset[this.selected.cellX+1][this.selected.cellY];
      }
    }else if (direction === 'left'){
      if(this.selected.cellX>0){
        this.selected = tileset[this.selected.cellX-1][this.selected.cellY];
      }
    }else if (direction === 'up'){
      if(this.selected.cellY>0){
        this.selected = tileset[this.selected.cellX][this.selected.cellY-1];
      }
    }else if (direction === 'down'){
      if(this.selected.cellY<8){
        this.selected = tileset[this.selected.cellX][this.selected.cellY1];
      }
    }
    unselect.select(false);
    this.selected.select(true);
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
