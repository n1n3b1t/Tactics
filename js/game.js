var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game');
var cursors, tileset, selected, prevDirection, hero, isoGroup, heroes, graph;
var enemies = new Array();
var TacticsGame = function() {


}

TacticsGame.prototype = {

  init: function() {

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
    var grid = [];
    for (var xx = 0; xx < 512; xx += 38) {
      var row = [];
      for (var yy = 0; yy < 512; yy += 38) {
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)
        var isWall = Math.floor(Math.random() * 5);

        tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
        tile.inputEnabled = true;
        tile.anchor.set(0.5, 0);
        tile.cellX = xx / 38;
        tile.cellY = yy / 38;
        if (isWall == 0) {

          row.push(GraphNodeType.WALL);
          tile.isWall = true;
          tile.tint = 0xff0000;
          console.log(GraphNodeType.WALL);
        } else {
          row.push(GraphNodeType.OPEN);
          tile.isWall = false;
        }
        tile.events.onInputOver.add(function() {
          if (!this.isWall)
            this.tint = 0x86bfda;
        }, tile);
        tile.events.onInputOut.add(function() {
          if (this.isWall) {
            tile.tint = 0xff0000;
          } else {
            this.tint = 0xffffff;
          }

        }, tile);
        var self = this;
        tile.events.onInputDown.add(function() {

          self.searchPath(this);

        }, tile);
      }
      grid.push(row);

      graph = new Graph(grid);
    }
  },
  createHero: function() {
    hero = new Hero(game);
    heroes.add(hero);
    hero.width = 56;
    hero.height = 56;
    hero.anchor.set(0.5, 0.5);
  },
  tileElement: function(node) {
    var neededTile=null;
    isoGroup.forEach(function(tile) {
      if (tile.cellX == node.x && tile.cellY == node.y)
        neededTile=tile;

    });
    return neededTile;
  },
  graphElement: function(tile) {
    return graph.nodes[tile.cellX][tile.cellY];
  },
  searchPath: function(tile) {
    var start = this.graphElement(hero);
    var end = this.graphElement(tile);

    var path = astar.search(graph.nodes, start, end);

    this.goToCell(path);

  },
  goToCell: function(path) {


    var firstTween,tween=null;
    for (var i = 0; i < path.length; i++) {
      var tile = this.tileElement(path[i]);
      console.log(tile.isoX + ' ' +tile.isoY);
      if(tween==null){
        tween = this.chainTween(tile);
        firstTween = tween;
      }else{
        var newTween = this.chainTween(tile);
        tween.chain(newTween);
        tween = newTween;
      }
      if(i==path.length-1){
        hero.cellX=tile.cellX;
        hero.cellY=tile.cellY;
      }

    }

    firstTween.start();



  },
  chainTween:function (tile) {
    var tween = game.add.tween(hero);
    tween.to({
      isoX: tile.isoX,
      isoY: tile.isoY
    }, 100, "Quart.easeOut",false);
      return tween;
    ;
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
