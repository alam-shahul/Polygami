// A Grid provides a coordinate system and access to elements on the paper.
class Grid {
  constructor(w, h) {
    // w and h are the width and height of the Grid
    this.w = w;
    this.h = h;

    // Instantiate a 2D array holding all the Tiles in the Grid
    this.tiles = [];
    var x, y;
    for (x = 0; x < w; x++) {
      this.tiles[x] = [];
      for (y = 0; y < h; y++) {
        this.tiles[x].push(new Tile(x, y));
      }
    }

    // Instantiate an object holding all the Points in the Grid
    // There is a Point every 0.5 of a grid unit
    // Points are keyed by stringified coordinates x,y
    this.points = {};
    for (x = 0; x <= w; x += 0.5) {
      for (y = 0; y <= h; y += 0.5) {
        this.points[Point.toString(x, y)] = new Point(x, y);
      }
    }

    // Instantiate an object with the Creases keyed by stringified endpoint
    // coordinates x,y
    this.creases = {};
    for (var point in this.points) {
      if (this.points.hasOwnProperty(point)) {
        this.creases[point] = [];
      }
    }
  }

  // Returns the Tile at an (x, y) location in this grid
  tile(x, y) {
    return this.tiles[x][y];
  }

  // Returns the Point at an (x, y) location in this grid
  point(x, y) {
    return this.points[Point.toString(x, y)];
  }

  // Returns the Creases in this grid with endpoints at an (x, y) location
  creasesAt(x, y) {
    return this.creases[Point.toString(x, y)];
  }

  // Returns whether crease already exists in the set of Creases in this grid
  creaseExists(crease) {
    var array = this.creases[Point.toString(crease.start.x, crease.start.y)];
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i].equals(crease)) {
        return true;
      }
    }
    array = this.creases[Point.toString(crease.end.x, crease.end.y)];
    for (i = 0; i < array.length; i++) {
      if (array[i].equals(crease)) {
        return true;
      }
    }
    return false;
  }

  // Creates a Crease starting at (x1, y1) going to (x2, y2) with the specified
  // color and adds it to this grid, if one does not already exist (returns
  // null if a Crease at these endpoints already exists)
  addCrease(x1, y1, x2, y2, color) {
    var start = this.point(x1, y1);
    var end = this.point(x2, y2);
    var crease = new Crease(start, end, color);
    if (this.creaseExists(crease)) {
      // The Crease already exists in the Grid, we return null
      return null;
    } else {
      // We add the Crease to our set of creases
      this.creases[Point.toString(start.x, start.y)].push(crease);
      this.creases[Point.toString(end.x, end.y)].push(crease);
      return crease;
    }
  }
}

class Tile {
  constructor(x, y) {
    // x and y are the coordinates of the bottom left corner of the Tile
    this.x = x;
    this.y = y;
  }

  // Adds corner to this tile (overrides any previous corners)
  setCorner(corner) {
    this.corner = corner;
  }

  // Returns whether there is a corner at this tile
  hasCorner() {
    return this.hasOwnProperty('corner');
  }
}