// A Grid provides a coordinate system and access to elements on the paper.
class Grid {
  constructor(w, h) {
    // w and h are the width and height of the Grid
    this.w = w;
    this.h = h;

    // Instantiate an empty array that will hold the Corners that will be placed in the grid
    this.corners = {};

    // Instantiate an empty array that will hold the locations of the faces that will be extruded from the grid
    this.extruded = {};

    // Instantiate an object holding all the Points in the Grid
    // There is a Point every 0.5 of a grid unit
    // Points are keyed by stringified coordinates x,y
    this.points = {};
    for (var x = 0; x <= w; x += 0.5) {
      for (var y = 0; y <= h; y += 0.5) {
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

    // Instantiate a set of Creases
    this.creaseSet = new Set();
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
    var array = this.creases[Point.toString(crease.endpoints[0].x, crease.endpoints[0].y)];
    var i;
    for (i = 0; i < array.length; i++) {
      if (array[i].equals(crease)) {
        return true;
      }
    }
    array = this.creases[Point.toString(crease.endpoints[1].x, crease.endpoints[1].y)];
    for (i = 0; i < array.length; i++) {
      if (array[i].equals(crease)) {
        return true;
      }
    }
    return false;
  }

  // Creates a Crease with endpoints p1 and p2 with the specified color and
  // adds it to this grid, if one does not already exist (returns null if a
  // Crease at these endpoints already exists)
  addCrease(p1, p2, color) {
    var crease = new Crease(p1, p2, color);
    if (this.creaseExists(crease)) {
      this.deleteCrease(p1, p2, color);
    }
      // We add the Crease to our set of creases
      
    this.creases[Point.toString(p1.x, p1.y)].push(crease);
    this.creases[Point.toString(p2.x, p2.y)].push(crease);
    this.creaseSet.add(crease);
    return crease;
  }
  
  // Delete Crease between certain points of a certain color
  deleteCrease(p1, p2, color) {
    var crease = new Crease(p1, p2, color);
    console.log(crease);
    console.log(p1);
    console.log(this.creases[Point.toString(p1.x, p1.y)]);
    if (this.creaseExists(crease)) {
      for(var i = 0; i < this.creases[Point.toString(p1.x, p1.y)].length; i++) {
        console.log("hurray");
        if((this.creases[Point.toString(p1.x, p1.y)][i]).equals(crease)) {
          console.log("wow");
          this.creases[Point.toString(p1.x, p1.y)].splice(i, 1);
        }
      }
      console.log("lol");
      for(var j = 0; j < this.creases[Point.toString(p2.x, p2.y)].length; j++) {
        if((this.creases[Point.toString(p2.x, p2.y)][j]).equals(crease)) {
          console.log("amazing");
          this.creases[Point.toString(p2.x, p2.y)].splice(j, 1);
        }
      }
    }
    console.log(crease);
    console.log(this.creases[Point.toString(p1.x, p1.y)]);
  }

  // Returns a string in FOLD format representing this grid.
  toFOLD() {
    var fold = '';
    var verticesStr = '';
    var facesStr = '';
    var edgesStr = '';
    var assignmentsStr = '';
    var vertices = [];
    var edges = [];
    var assignments = [];
    var i;

    // Write out file info
    fold += '{';
    fold += '"file_spec": 1,';
    fold += '"file_creator": "A text editor",';
    fold += '"file_author": "Polygami",';
    fold += '"file_classes": ["singleModel"],';
    fold += '"frame_title": "Cube extrusion crease pattern",';
    fold += '"frame_classes": ["creasePattern"],';
    fold += '"frame_attributes": ["2D"],';

    // Set up four corners and edges of paper
    vertices.push('0,0');
    vertices.push('0,' + this.h);
    vertices.push(this.w + ',0');
    vertices.push(this.w + ',' + this.h);
    edges.push('0,1');
    edges.push('0,2');
    edges.push('1,3');
    edges.push('2,3');
    for (i = 0; i < 4; i++) {
      assignments.push('B');
    }

    // Find vertices and edges
    this.creaseSet.forEach(function(crease) {
      var startIndex, endIndex;
      var vertex = crease.start.x + ',' + crease.start.y;
      if (vertices.includes(vertex)) {
        startIndex = vertices.indexOf(vertex);
      } else {
        startIndex = vertices.push(vertex) - 1;
      }

      vertex = crease.end.x + ',' + crease.end.y;
      if (vertices.includes(vertex)) {
        endIndex = vertices.indexOf(vertex);
      } else {
        endIndex = vertices.push(vertex) - 1;
      }
      
      if (!edges.includes(startIndex + ',' + endIndex)) {
        edges.push(startIndex + ',' + endIndex);
        assignments.push(crease.color);
      }
    });

    // Write out vertices
    verticesStr += '"vertices_coords": [';
    for (i = 0; i < vertices.length - 1; i++) {
      verticesStr += '[' + vertices[i] + ',0],';
    }
    verticesStr += '[' + vertices[vertices.length - 1] + ',0]';
    verticesStr += '],';

    // Write out faces
    facesStr += '"faces_vertices": [';
    facesStr += '[0,2,3,1]';
    facesStr += '],';

    // Write out edges
    edgesStr += '"edges_vertices": [';
    for (i = 0; i < edges.length - 1; i++) {
      edgesStr += '[' + edges[i] + '],';
    }
    edgesStr += '[' + edges[edges.length - 1] + ']';
    edgesStr += '],';

    // Write out edge assignments
    assignmentsStr += '"edges_assignment": [';
    for (i = 0; i < assignments.length - 1; i++) {
      assignmentsStr += '"' + assignments[i] + '",';
    }
    assignmentsStr += '"' + assignments[assignments.length - 1] + '"';
    assignmentsStr += ']';

    fold += verticesStr;
    fold += facesStr;
    fold += edgesStr;
    fold += assignmentsStr;
    fold += '}';

    return fold;
  }
}
