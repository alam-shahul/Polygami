// A Crease represents a crease in the paper that runs from one Point to another
// Point. Each Crease has a direction of folding (ex. mountain and valley).
class Crease {
  constructor(p1, p2, color) {
    // p1 and p2 are Points
    this.endpoints = [p1, p2];
    // color represents the crease direction
    this.color = color;
  }

  equals(obj) {
    if (typeof obj !== typeof this) {
      return false;
    }
    // The Crease equality operator does NOT consider color
    for (var i = 0; i < this.endpoints.length; i++) {
      if (!(obj.endpoints.includes(this.endpoints[i]))) {
        return false;
      }
    }
    return true;
  }
}