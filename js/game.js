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
        if (this.board.grid[i][j] !== null && this.board.grid[i][j].val === 64) {
          alert("Winner!")
        }
      }
    }
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
    this.allCombinable();
  };

})();
