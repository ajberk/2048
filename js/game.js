(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var Game = TFE.Game = function() {
    this.board = new TFE.Board();
  };

  Game.prototype.gridCopy = function() {
    var copy = [];
    for (var i = 0; i < this.board.grid.length; i++) {
      copy.push([])
      for (var j = 0; j < this.board.grid.length; j++) {
        copy[i][j] = this.board.grid[i][j]
      }
    }
    return copy
  };

  Game.prototype.addPieceIfMoved = function(copy) {
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid.length; j++) {
        if (copy[i][j] !== this.board.grid[i][j]) {
          this.board.newPiece();
          return;
        }
      }
    }
  }

  Game.prototype.allCombinable = function(){
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid.length; j++) {
        if (this.board.grid[i][j] !== null) {
          this.board.grid[i][j].combinable = true;
        }
      }
    }
  }

  Game.prototype.checkWinner = function() {
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid.length; j++) {
        if (this.board.grid[i][j] !== null && this.board.grid[i][j].val === 2048) {
          alert("Winner!")
        }
      }
    }
  }

  Game.prototype.checkLoser = function() {
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid.length; j++) {
         if (this.board.grid[i][j] === null) {
            return false;
         }
       }
     }
     if (this.movesPossible()) {
       return false;
     }
    alert("You lost, but great effort!");
    return true;
   }

  Game.prototype.sameValueNeighbor = function(i,j) {
    return (
      (this.isOnBoard(i+1, j) && this.board.grid[i][j].val === this.board.grid[i+1][j].val) ||
      (this.isOnBoard(i-1, j) && this.board.grid[i][j].val === this.board.grid[i-1][j].val) ||
      (this.isOnBoard(i, j+1) && this.board.grid[i][j].val === this.board.grid[i][j+1].val) ||
      (this.isOnBoard(i, j-1) && this.board.grid[i][j].val === this.board.grid[i][j-1].val)
    )
  }

  Game.prototype.isOnBoard = function(i, j) {
    return (i >= 0 && i <= 3 && j >= 0 && j <= 3)
  }

  Game.prototype.movesPossible = function() {
    for (var i = 0; i < this.board.grid.length; i++) {
      for (var j = 0; j < this.board.grid.length; j++) {
        if (this.sameValueNeighbor(i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  Game.prototype.move = function(key_dir) {
    var copy = this.gridCopy();
    switch (key_dir) {
      case "N":
        this.board.movePiecesUp()
        break
      case "S":
        this.board.movePiecesDown()
        break
      case "E":
        this.board.movePiecesRight()
        break
      case "W":
        this.board.movePiecesLeft()
        break
    }
    this.checkWinner();
    this.addPieceIfMoved(copy);
    this.checkLoser();
    this.allCombinable();
  };

})();
