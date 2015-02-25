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
  };

})();
