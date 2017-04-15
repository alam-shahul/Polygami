// A Corner represents a set of triangular creases (in the arctan half gadget)
// that is used for extruding a polycube.
class Corner {
  constructor(priority, tipPoint, bottomLeftPoint) {
    // priority defines the order in which Corners should be expanded
    this.priority = priority;

    // tip is the direction of a corner, indicated by the point which is at the top of the corner
    this.tip = tipPoint;

    // position indicates the position of the bottom left point of the corner
    this.position = bottomLeftPoint;
  }
}