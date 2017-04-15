// A Point represents a coordinate on the grid system.
class Point {
  constructor(x, y) {
    // x and y are coordinates in the grid system with (0, 0) in the lower left
    // of the grid
    this.x = x;
    this.y = y;
  }

  // Returns x and y as the string x,y
  static toString(x, y) {
    return x.toString() + ',' + y.toString();
  }

  // Returns the string x,y as [x, y]
  static toCoords(string) {
    return [parseFloat(string.split(',')[0]), parseFloat(string.split(',')[1])];
  }

  equals(obj) {
    if (typeof obj !== typeof this) {
      return false;
    }
    if (this.x === obj.x && this.y === obj.y) {
      return true;
    }
    return false;
  }
}