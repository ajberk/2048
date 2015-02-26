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

  Board.prototype.render = function() {

  };

  Board.prototype.addPieceClass = function(pos) {
    var $piece = $('.square[data-pos="'+pos+'"]')
    $piece.append(this.grid[pos[0]][pos[1]].val) //the number for the text
    $piece.addClass("piece");
  };

  Board.prototype.removePieceClass = function(pos) {
    var $piece = $('.square[data-pos="'+pos+'"]')
    $piece.removeClass("piece");
    $piece.html("");
  };

  Board.prototype.movePiece = function(i, j, dir) {
    this.grid[i+dir][j] = this.grid[i][j];
    this.removePieceClass([i, j]);
    this.addPieceClass([i+dir, j]);
    this.grid[i][j] = null;
  };

  Board.prototype.movePiecesDown = function() {
    for (var i = 2; i >= 0; i--) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i+1][j] === null && this.grid[i][j] !== null) {
          this.movePiece(i, j, 1);
        }
      }
    }
  };

  Board.prototype.movePiecesUp = function() {
    for (var i = 1; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i-1][j] === null && this.grid[i][j] !== null) {
          this.movePiece(i, j, -1);
        }
      }
    }

  };

  Board.prototype.movePiecesDown = function(direction) {
  };

  Board.prototype.movePiecesRight = function(direction) {
  };

  Board.prototype.movePiecesLeft = function(direction) {
  };


})();
