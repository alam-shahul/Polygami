var width = 10;
var height = 10;

const VIEWER_SIZE = 600;

var draw;
var test;

$(document).ready(function() {
  // Test grid for SVG viewer:
  test = new Grid(10, 10);
  test.addCrease(0, 0, 4, 0, 'V');
  test.addCrease(0, 1, 4, 1, 'M');
  test.addCrease(0, 2, 4, 2, 'V');
  test.addCrease(0, 3, 4, 3, 'M');
  test.addCrease(0, 4, 4, 4, 'V');
  test.addCrease(0, 5, 4, 5, 'M');
  test.addCrease(0, 6, 4, 6, 'V');
  test.addCrease(0, 7, 4, 7, 'M');
  test.addCrease(0, 8, 4, 8, 'V');
  test.addCrease(0, 9, 4, 9, 'M');

  // Set up crease pattern viewer
  draw = SVG('viewer').size(VIEWER_SIZE, VIEWER_SIZE);

  // Initialize the grid
  setupGrid();

  // // Add FOLD viewers
  // FOLD = require('fold');
  // viewer = FOLD.viewer.addViewer(document.getElementById('viewer'), { viewButtons: false, axisButtons: false, properties: false, examples: false, import: false });
  // exportviewer = FOLD.viewer.addViewer(document.getElementById('exportviewer'), { viewButtons: false, axisButtons: false, properties: false, examples: false, import: false });
  // // FOLD.viewer.processInput('{  "file_spec": 1,  "file_creator": "A text editor",  "file_author": "Jason Ku",  "file_classes": ["singleModel"],  "frame_title": "Three-fold 3D example",  "frame_classes": ["foldedForm"],  "frame_attributes": ["3D"],  "vertices_coords": [    [0,1,0],    [0,0,1],    [0,-1,0],    [1,0,0],    [0,0,-1],    [0,0,-1]  ],  "faces_vertices": [    [0,1,2],    [0,2,3],    [0,4,1],    [1,5,2]  ],  "edges_vertices": [    [0,2],    [0,1],    [1,2],    [2,3],    [0,3],    [1,4],    [1,5],    [0,4],    [2,5]  ],  "edges_assignment": [    "V",    "M",    "M",    "B",    "B",    "B",    "B",    "B",    "B"  ],  "faceOrders": [    [2,0,-1],    [3,0,-1]  ]}', viewer);
  // // FOLD.viewer.processInput('{  "file_spec": 1,  "file_creator": "A text editor",  "file_author": "Jason Ku",  "file_classes": ["singleModel"],  "frame_title": "Three-fold 3D example",  "frame_classes": ["creasePattern"],  "frame_attributes": ["2D"],  "vertices_coords": [    [0,1,0],    [0,0,1],    [0,-1,0],    [1,0,0],    [0,0,-1],    [0,0,-1]  ],  "faces_vertices": [    [0,1,2],    [0,2,3],    [0,4,1],    [1,5,2]  ],  "edges_vertices": [    [0,2],    [0,1],    [1,2],    [2,3],    [0,3],    [1,4],    [1,5],    [0,4],    [2,5]  ],  "edges_assignment": [    "V",    "M",    "M",    "B",    "B",    "B",    "B",    "B",    "B"  ],  "faceOrders": [    [2,0,-1],    [3,0,-1]  ]}', viewer);
  // var foldObj = JSON.parse('{  "file_spec": 1,  "file_creator": "A text editor",  "file_author": "Polygami",  "file_classes": ["singleModel"],  "frame_title": "Cube extrusion crease pattern",  "frame_classes": ["creasePattern"],  "frame_attributes": ["2D"],  "vertices_coords": [    [0,0,0],    [0,3,0],    [5,0,0],    [5,3,0],    [0,1,0],    [5,1,0]  ],  "faces_vertices": [    [0,2,3,1]  ],  "edges_vertices": [    [0,1],    [0,2],    [1,3],    [2,3],    [4,5]  ],  "edges_assignment": [    "B",    "B",    "B",    "B",    "M"  ]}');
  // console.log(foldObj);
  // console.log(FOLD.convert.edges_vertices_to_faces_vertices(foldObj));

  // FOLD.viewer.processInput('{  "file_spec": 1,  "file_creator": "A text editor",  "file_author": "Polygami",  "file_classes": ["singleModel"],  "frame_title": "Cube extrusion crease pattern",  "frame_classes": ["creasePattern"],  "frame_attributes": ["2D"],  "vertices_coords": [    [0,0,0],    [0,3,0],    [5,0,0],    [5,3,0],    [0,1,0],    [5,1,0]  ],  "faces_vertices": [    [0,2,3,1]  ],  "edges_vertices": [    [0,1],    [0,2],    [1,3],    [2,3],    [4,5]  ],  "edges_assignment": [    "B",    "B",    "B",    "B",    "M"  ]}', viewer);
  // // FOLD.viewer.processInput(test.toFOLD(), viewer);
  // FOLD.viewer.processInput('{  "file_spec": 1,  "file_creator": "A text editor",  "file_author": "Jason Ku",  "file_classes": ["singleModel"],  "frame_title": "Three-fold 3D example",  "frame_classes": ["foldedForm"],  "frame_attributes": ["3D"],  "vertices_coords": [    [0,1,0],    [0,0,1],    [0,-1,0],    [1,0,0],    [0,0,-1],    [0,0,-1]  ],  "faces_vertices": [    [0,1,2],    [0,2,3],    [0,4,1],    [1,5,2]  ],  "edges_vertices": [    [0,2],    [0,1],    [1,2],    [2,3],    [0,3],    [1,4],    [1,5],    [0,4],    [2,5]  ],  "edges_assignment": [    "V",    "M",    "M",    "B",    "B",    "B",    "B",    "B",    "B"  ],  "faceOrders": [    [2,0,-1],    [3,0,-1]  ]}', exportviewer);
  // $('#export-svg').attr('href', 'data:image/svg+xml;utf8,' + unescape($('#exportviewer svg')[0].outerHTML));
  // // FOLD.viewer.processInput(/* FOLD file string */, view1);

  // Event handlers
  $('#update-grid-size').click(function() {
    width = parseInt($('#width').val());
    height = parseInt($('#height').val());
    setupGrid();
  });

  $('#clear-grid').click(function() {
    for (var r = 0; r < height; r++) {
      for (var c = 0; c < width; c++) {
        $('#' + c + '-' + r).removeClass('filled');
      }
    }
    updateOutput();
  });
});

function setupGrid() {
  // Clear any existing grid
  $('#grid').empty();

  // Draw the new cells
  for (var r = height - 1; r >= 0; r--) {
    var rowString = '<tr>';
    for (var c = 0; c < width; c++) {
      rowString += '<td id="' + c + '-' + r + '"><span></span></td>';
    }
    rowString += '</tr>';
    $('#grid').append(rowString);
  }

  updateOutput();

  // Add click triggers on tds
  $('#grid td').click(function() {
    $(this).toggleClass('filled');
    updateOutput();
  });
};

// Update the crease pattern and 3D viewer
function updateOutput() {
  var grid = parseGrid();
  var pattern = updateCreasePattern(grid);
  // TODO: Actually use pattern instead of test grid
  updateViewer(test);
  // updateViewer(pattern);
};

// Parses the pixel input into a 2D array
function parseGrid() {
  var grid = [];
  for (var x = 0; x < width; x++) {
    grid.push([]);
    for (var y = 0; y < height; y++) {
      if ($('#' + x + '-' + y).hasClass('filled')) {
        grid[x].push(1);
      } else {
        grid[x].push(0);
      }
    }
  }
  return grid;
};

function updateCreasePattern(grid) {
  grid = computeCorners(parseGrid());
  // TODO calculate rest of crease pattern from corners
};

function updateViewer(grid) {
  // Clear any existing crease pattern
  draw.clear();

  // Figure out scale factor to fit into viewer window
  var scale;
  if (width > height) {
    scale = VIEWER_SIZE / width;
  } else {
    scale = VIEWER_SIZE / height;
  }

  // Draw paper
  draw.rect(width * scale, height * scale).attr({ fill: '#fff' }).stroke({ width: 3 });

  // Draw creases
  grid.creaseSet.forEach(function(crease) {
    // Flip the y-axis for drawing to screen
    if (crease.color === 'M') {
      // Mountains are red
      draw.line(crease.start.x * scale, (grid.h - crease.start.y) * scale, crease.end.x * scale, (grid.h - crease.end.y) * scale).stroke({ width: 1, color: '#f00' });
    } else if (crease.color === 'V') {
      // Valleys are blue
      draw.line(crease.start.x * scale, (grid.h - crease.start.y) * scale, crease.end.x * scale, (grid.h - crease.end.y) * scale).stroke({ width: 1, color: '#00f' });
    } else {
      // By default, draw in black
      draw.line(crease.start.x * scale, (grid.h - crease.start.y) * scale, crease.end.x * scale, (grid.h - crease.end.y) * scale).stroke({ width: 1, color: '#000' });
    }
  });

  // Update SVG export
  $('#export-svg').attr('href', 'data:image/svg+xml;utf8,' + unescape($('#viewer svg')[0].outerHTML));
};