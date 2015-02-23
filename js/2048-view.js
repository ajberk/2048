(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var View = TFE.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function() {
    // click handlers and stuff
  };

  View.prototype.setupBoard = function() {
    var $container = $("<div>");
    $container.addClass("container");

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var $square = $("<div>");
        $square.addClass("square")
        $square.data("pos", [i,j]);
        $container.append($square)
      }
    }
    this.$el.append($container)
  };
})();
