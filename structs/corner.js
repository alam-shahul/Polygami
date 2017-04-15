// A Corner represents a set of triangular creases (in the arctan half gadget)
// that is used for extruding a polycube.
class Corner {
  constructor(priority, tipPoint, direction) {
    // priority defines the order in which Corners should be expanded
    this.priority = priority;

    // tip is the direction of a corner, indicated by the point which is at the top of the corner
    this.tip = tipPoint;

    // direction is one of the directons that denotes the direction of the corner
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
