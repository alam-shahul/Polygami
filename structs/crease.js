// A Crease represents a crease in the paper that runs from one Point to another
// Point. Each Crease has a direction of folding (ex. mountain and valley).
class Crease {
  constructor(start, end, color) {
    // start and end are Points
    this.start = start;
    this.end = end;
    // color represents the crease direction
    this.color = color;
  }

  equals(obj) {
    if (typeof obj !== typeof this) {
      return false;
    }
    // The Crease equality operator does NOT consider color
    if (this.start.equals(obj.start) && this.end.equals(obj.end)) {
      return true;
    }
    return false;
  }
}