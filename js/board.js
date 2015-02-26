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
    this.grid[newpiecepos[0]][newpiecepos[1]] = new TFE.Piece();
    this.addPieceClass(newpiecepos);
  };

  Board.prototype.render = function() {

  };

  Board.prototype.addPieceClass = function(pos) {
    var $piece = $('.square[data-pos="'+pos+'"]')
    $piece.html(this.grid[pos[0]][pos[1]].val) //the number for the text
    $piece.addClass("piece");
  };

  Board.prototype.removePieceClass = function(pos) {
    var $piece = $('.square[data-pos="'+pos+'"]')
    $piece.removeClass("piece");
    $piece.html("");
  };

  Board.prototype.movePieceUpDown = function(i, j, dir) {
    this.grid[i+dir][j] = this.grid[i][j];
    this.addPieceClass([i+dir, j]);
    this.removePieceClass([i, j]);
    this.grid[i][j] = null;
  };

  Board.prototype.movePieceLeftRight = function(i, j, dir) {
    this.grid[i][j+dir] = this.grid[i][j];
    this.addPieceClass([i, j+dir]);
    this.removePieceClass([i, j]);
    this.grid[i][j] = null;
  };

  Board.prototype.movePiecesDown = function() {
    for (var i = 2; i >= 0; i--) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i+1][j] === null && this.grid[i][j] !== null) {
          this.movePieceUpDown(i, j, 1);
          this.movePiecesDown();
        }
      }
    }
  };

  Board.prototype.movePiecesUp = function() {
    for (var i = 1; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i-1][j] === null && this.grid[i][j] !== null) {
          this.movePieceUpDown(i, j, -1);
          this.movePiecesUp();
        }
      }
    }

  };


  Board.prototype.movePiecesRight = function(direction) {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 3; j >= 0; j--) {
        if (this.grid[i][j+1] === null && this.grid[i][j] !== null) {
          this.movePieceLeftRight(i, j, 1);
          this.movePiecesRight();
        }
      }
    }
  };

  Board.prototype.movePiecesLeft = function(direction) {
    for (var i = 3; i >= 0; i--) {
      for (var j = 3; j >= 0; j--) {
        if (this.grid[i][j-1] === null && this.grid[i][j] !== null) {
          this.movePieceLeftRight(i, j, -1);
          this.movePiecesLeft();
        }
      }
    }

  };

  // Board.prototype.transpose = function() {
  //   var transposed = [];
  //   for (var i = 0; i < this.grid.length; i++) {
  //     transposed.push([])
  //     for (var j = 0; j < this.grid.length; j++) {
  //       transposed[i][j] = this.grid[j][i]
  //     }
  //   }
  //   return transposed
  // };




})();
