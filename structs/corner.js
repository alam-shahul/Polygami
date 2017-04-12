// A Corner represents a set of triangular creases (in the arctan half gadget)
// that is used for extruding a polycube.
class Corner {
  constructor(priority, direction) {
    // priority defines the order in which Corners should be expanded
    this.priority = priority;

    // direction is the direction of a corner
    this.direction = direction;
  }
}