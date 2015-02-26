(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  };

  var Piece = TFE.Piece = function() {
    this.combinable = true;
    var rand = Math.random();
    if (rand < .9) {
      this.val = 2;
    } else {
      this.val = 4;
    }
  };

  Piece.prototype.doubleVal = function(){
    this.val = (this.val * 2);
    this.combinable = false;
  };

})();
