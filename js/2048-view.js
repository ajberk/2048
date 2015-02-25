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
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.render = function () {
    this.updateGrid(this.game.board.grid);
  };

  View.prototype.updateGrid = function(grid) {
    alert("hey")
  };

  View.prototype.handleKeyEvent = function (event) {
    if (View.KEYS[event.keyCode]) {
      this.game.move(View.KEYS[event.keyCode])
    } else {
      // some other key was pressed; ignore.
    }
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
          this.showPiece([i,j], grid)
        }
      }
    }
  };

  View.prototype.showPiece = function(pos, grid) {
    $square = $('.square[data-pos="'+pos+'"]')
    $square.append(grid[pos[0]][pos[1]].val) //the number for the text
    $square.addClass("piece");
  }
})();









//
