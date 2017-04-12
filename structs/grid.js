// A Grid provides a coordinate system and access to elements on the paper.
class Grid {
  constructor(w, h) {
    // w and h are the width and height of the Grid
    this.w = w;
    this.h = h;

    // Instantiate an array holding all the Tiles in the Grid
    this.tiles = [];
    for (var r = 0; r < h; r++) {
      this.tiles[r] = [];
      for (var c = 0; c < w; c++) {
        this.tiles[r].push(new Tile(r, c));
      }
    }
  }
}

class Tile {
  constructor(x, y) {
    // x and y are the coordinates of the bottom left corner of the Tile
    this.x = x;
    this.y = y;
  }
}