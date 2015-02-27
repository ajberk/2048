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
    var newPiecePos = this.randEmptyPos();
    this.grid[newPiecePos[1]][newPiecePos[0]] = new TFE.Piece();
    this.addPieceClass(newPiecePos.reverse());
  };

  Board.prototype.addPieceClass = function(pos) {
    var $square = $('.square[data-pos="'+pos+'"]')
    var $piece = $("<div>")
    $piece.html(this.grid[pos[0]][pos[1]].val) //the number for the text
    $piece.addClass("piece");
    $square.append($piece);
  };

  Board.prototype.removePieceClass = function(pos) {
    var $square = $('.square[data-pos="'+pos+'"]')
    $square.html("");
  };

  Board.prototype.movePieceUpDown = function(i, j, dir) {
    this.grid[i+dir][j] = this.grid[i][j];
    this.addPieceClass([i+dir, j]);
    this.removePieceClass([i, j]);
    this.grid[i][j] = null;
  };

  Board.prototype.combinePieceUpDown = function(i, j, dir) {
    if (this.grid[i+dir][j] !== null && this.grid[i][j] !== null && this.grid[i+dir][j].val === this.grid[i][j].val && this.grid[i][j].combinable && this.grid[i+dir][j].combinable) {
      this.grid[i+dir][j].doubleVal();
      this.addPieceClass([i+dir, j])
      this.removePieceClass([i,j])
      this.grid[i][j] = null;
    //   var $piece = $('.square[data-pos="'+[i+dir, j]+'"]')
    //   $piece.animate({
    //     fontSize: "600%"
    //   });
    //   $piece.animate({
    //     fontSize: "300%"
    //   });
    //   this.grid[i][j] = null;
    }
  };

  Board.prototype.combinePieceLeftRight = function(i, j, dir) {
    if (this.grid[i][j+dir] !== null && this.grid[i][j] !== null && this.grid[i][j+dir].val === this.grid[i][j].val && this.grid[i][j].combinable && this.grid[i][j+dir].combinable) {
      this.grid[i][j+dir].doubleVal();
      this.addPieceClass([i, j+dir])
      this.removePieceClass([i,j])
      var $piece = $('.square[data-pos="'+[i, j+dir]+'"]')
      // $piece.animate({
      //   fontSize: "600%"
      //   });
      //   $piece.animate({
      //     fontSize: "300%"
      //   });
      this.grid[i][j] = null;
    }
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
        this.combinePieceUpDown(i, j, 1)
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
        this.combinePieceUpDown(i, j, -1)
        if (this.grid[i-1][j] === null && this.grid[i][j] !== null) {
          this.movePieceUpDown(i, j, -1);
          this.movePiecesUp();
        }
      }
    }
  };

  // Board.prototype.pieceSlide = function($piece, dir) {
  //   $piece.animate({"left": "+=100%"}, "slow");
  // }

  Board.prototype.movePiecesRight = function(direction) {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 2; j >= 0; j--) {
        if (this.grid[i][j+1] === null && this.grid[i][j] !== null) {
          this.movePieceLeftRight(i, j, 1);
          this.movePiecesRight();
        }
        this.combinePieceLeftRight(i, j, 1)
      }
    }
  };

  Board.prototype.movePiecesLeft = function(direction) {
    for (var i = 3; i >= 0; i--) {
      for (var j = 3; j >= 1; j--) {
        if (this.grid[i][j-1] === null && this.grid[i][j] !== null) {
          this.movePieceLeftRight(i, j, -1);
          this.movePiecesLeft();
        }
        this.combinePieceLeftRight(i, j, -1)
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
