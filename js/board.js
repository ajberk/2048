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
    var $newPiece = this.addPieceClass(newPiecePos.reverse());
    this.newPieceAnimation($newPiece);
  };

  Board.prototype.newPieceAnimation = function($piece) {
    $piece.css({
      backgroundColor: "#8EB0C4",
      // "#308FC2",
    });

    $piece.animate({
      height: "0%",
      width: "0%",
      marginLeft: "+=50%",
      marginTop: "+=20%",
    },0);

    $piece.animate({
      height: "100%",
      width: "100%",
      marginLeft: "-=50%",
      marginTop: "-=20%",
    }, 100, function() {
      $piece.css({
        backgroundColor: "#8EB0C4",
      });
    });
  }

  Board.prototype.findPiece = function(pos) {
    var $square = $('.square[data-pos="' + pos + '"]')
    return $square.children();
  };

  Board.prototype.combinePieceAnimation = function($piece) {
    $piece.css({
      backgroundColor: "#308FC2",
      // zIndex: 20000
    });

    $piece.animate({
      height: "150%",
      width: "150%",
      marginLeft: "-=20%",
      marginTop: "-=20%",
      z: 20000,
    },100);

    $piece.animate({
      height: "100%",
      width: "100%",
      marginLeft: "+=20%",
      marginTop: "+=20%",
      z: 20000,
    }, 100, function() {
      $piece.css({
        backgroundColor: "#8EB0C4",
        // zIndex: 20000
      });
    });

  }

  Board.prototype.addPieceClass = function(pos) {
    var $square = $('.square[data-pos="'+pos+'"]')
    var $piece = $("<div>")
    $piece.html(this.grid[pos[0]][pos[1]].val) //the number for the text
    $piece.addClass("piece");
    $square.append($piece);
    return $piece;
  };

  Board.prototype.removePieceClass = function(pos) {
    var $square = $('.square[data-pos="'+pos+'"]')
    $square.empty();
  };


  Board.prototype.movePieceUpDown = function(i, j, dir) {
    // var $piece = this.findPiece([i,j])
    this.grid[i+dir][j] = this.grid[i][j];
    this.removePieceClass([i, j]);
    this.addPieceClass([i+dir, j]);
    this.grid[i][j] = null;
  };


  Board.prototype.combinePieceUpDown = function(i, j, dir) {
    if (this.grid[i+dir][j] !== null && this.grid[i][j] !== null && this.grid[i+dir][j].val === this.grid[i][j].val && this.grid[i][j].combinable && this.grid[i+dir][j].combinable) {
      this.grid[i+dir][j].doubleVal();
      this.removePieceClass([i,j])
      this.removePieceClass([i+dir, j])
      this.addPieceClass([i+dir, j])
      this.grid[i][j] = null;
      var $piece = this.findPiece([i+dir,j])
      this.combinePieceAnimation($piece)
      this.grid[i][j] = null;
    }
  };

  Board.prototype.combinePieceLeftRight = function(i, j, dir) {
    if (this.grid[i][j+dir] !== null && this.grid[i][j] !== null && this.grid[i][j+dir].val === this.grid[i][j].val && this.grid[i][j].combinable && this.grid[i][j+dir].combinable) {
      this.grid[i][j+dir].doubleVal();
      this.removePieceClass([i,j])
      this.removePieceClass([i, j+dir])
      this.addPieceClass([i, j+dir])
      var $piece = this.findPiece([i,j+dir])
      this.combinePieceAnimation($piece)
      this.grid[i][j] = null;
    }
  };

  Board.prototype.movePieceLeftRight = function(i, j, dir) {
    this.grid[i][j+dir] = this.grid[i][j];
    var $piece = this.addPieceClass([i, j+dir]);
    // this.slideDirectionLeftRight($piece, dir);
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
  }

  Board.prototype.slideDirectionLeftRight = function($piece, dir) {
    dir === 1 ? $piece.animate({"left": "+=150px"}, "slow") : $piece.animate({"right": "+=150px"}, "slow")
    return direction;
  }

  Board.prototype.slideDirectionUpDown = function($piece, dir) {
    dir === -1 ? $piece.animate({"bottom": "+=150px"}, "slow") : $piece.animate({"top": "+=150px"}, "slow")
    return direction;
  }
})();
