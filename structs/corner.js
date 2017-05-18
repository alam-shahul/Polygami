// A Corner represents a set of triangular creases (in the arctan half gadget)
// that is used for extruding a polycube.
class Corner {
  constructor(priority, tipPoint, direction) {
    // priority defines the order in which Corners should be expanded
    this.priority = priority;

    // tip is the Point between the two equal length sides of the Corner
    this.tip = tipPoint;

    // direction denotes the direction of the Corner with the location of the
    // tip relative to the rest of the Corner
    this.direction = direction;
  }
}

// I don't know how to create static variables in JS
Corner.directions = {
  bottomLeft : 0,
  bottomRight: 1,
  topLeft: 2,
  topRight: 3,
};
