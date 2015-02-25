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
        alert("Up Arrow key was pressed!")
        break
      case "S":
        alert("Down Arrow key was pressed")
        break
      case "E":
        alert("Right Arrow key was pressed")
        break
      case "W":
        alert("Left Arrow key was pressed")
        break
    }


  };

})();
