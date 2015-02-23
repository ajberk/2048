function Board() {
  this.grid = Board.makeGrid();
};

Board.makeGrid = function () {
  var grid = [];
  for (var i = 0; i < 4; i++) {
    grid.push([]);
    for (var j = 0; j < 4; j++) {
      grid[i].push(null);
    }
  }
  return grid;
};
