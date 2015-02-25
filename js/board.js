(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var Board = TFE.Board = function() {
    this.grid = this.makeGrid();
    this.startGame();
  };

  Board.prototype.makeGrid = function () {
    var grid = [];
    for (var i = 0; i < 4; i++) {
      grid.push([]);
      for (var j = 0; j < 4; j++) {
        grid[i].push(null);
      }
    }
    return grid;
  };

  Board.prototype.isEmpty = function(pos){
    if (this.grid[pos[1]][pos[0]] === null) {
      return true;
    }
    return false;
  };

  Board.prototype.randEmptyPos = function() {
    var xpos = Math.floor(Math.random() * 4);
    var ypos = Math.floor(Math.random() * 4);
    while (!this.isEmpty([xpos, ypos])) {
      xpos = Math.floor(Math.random() * 4);
      ypos = Math.floor(Math.random() * 4);
    }
    return [xpos, ypos];
  };


  Board.prototype.startGame = function() {
    var piece1pos = this.randEmptyPos();
    var piece2pos = this.randEmptyPos();
    while ((piece1pos[0] == piece2pos[0]) && piece1pos[1] == piece2pos[1]) {
      piece2pos = this.randEmptyPos();
    }
    this.grid[piece1pos[1]][piece1pos[0]] = new TFE.Piece();
    this.grid[piece2pos[1]][piece2pos[0]] = new TFE.Piece();
  };

  Board.prototype.newPiece = function() {
    var newpiecepos = this.randEmptyPos();
    this.grid[newpiecepos[1]][newpiecepos[0]] = new TFE.Piece();
  };

  Board.prototype.movePieces = function(direction) {
    debugger
  };


})();
