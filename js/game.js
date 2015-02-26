(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var Game = TFE.Game = function() {
    this.board = new TFE.Board();
  };

  Game.prototype.move = function(key_dir) {
    switch (key_dir) {
      case "N":
        this.board.movePiecesUp()
        this.board.newPiece()
        break
      case "S":
        this.board.movePiecesDown()
        this.board.newPiece()
        break
      case "E":
        this.board.movePiecesRight()
        this.board.newPiece()
        break
      case "W":
        this.board.movePiecesLeft()
        this.board.newPiece()
        break
    }

  };

})();
