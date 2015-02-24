(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var Game = TFE.Game = function() {
    this.board = new TFE.Board();
  };

})();
