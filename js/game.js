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
        this.board.movePieces([-1,0])
        break
      case "S":
        this.board.movePieces([1,0])
        break
      case "E":
        this.board.movePieces([0,1])
        break
      case "W":
        this.board.movePieces([0,-1])
        break
    }
  };

})();
