(function() {
  if (typeof TFE === "undefined") {
    window.TFE = {};
  }

  var View = TFE.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
    this.showPieces(this.game.board.grid)
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
        $square.attr("data-pos", [i,j]);
        $container.append($square)
      }
    }
    this.$el.append($container)
  };

  View.prototype.showPieces = function(grid) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (grid[i][j] !== null)    {
          this.showPiece([i,j])
        }
      }
    }
  }

  View.prototype.showPiece = function(pos) {
    $square = $('.square[data-pos="'+pos+'"]')
    var $piece = $("<div>");
    $piece.addClass("piece");
    $square.append($piece);
  }








})();
