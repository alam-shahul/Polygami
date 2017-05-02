var width = 10;
var height = 10;

const VIEWER_SIZE = 600;

var draw;
var colorSchemeExtended = true;
var inputMode3D = true;

$(document).ready(function() {
  // Set up crease pattern viewer
  draw = SVG('viewer').size(VIEWER_SIZE, VIEWER_SIZE);

  // Initialize the grid
  setupGrid();

  // Event handlers
  $('.grid-size-input').keypress(function(e) {
    if (e.which == 13) { // Enter key
      $('#update-grid-size').click();
      return false;
    }
  });

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

  $('#generate-crease-pattern').click(function() {
    updateOutput();
  });

  $('#input-mode-2d').click(function() {
    if (!($(this).hasClass('active'))) {
      inputMode3D = false;
      $('.input-mode-picker').removeClass('active');
      $(this).addClass('active');
      $('#grid').show();
      $('.controls-2d').show();
      $('.controls-3d').hide();
      $('#input-3d').empty();
      $('#input-title').text('Pixel Input');
      updateOutput();
    }
  });

  $('#input-mode-3d').click(function() {
    if (!($(this).hasClass('active'))) {
      inputMode3D = true;
      $('.input-mode-picker').removeClass('active');
      $(this).addClass('active');
      $('#grid').hide();
      $('.controls-2d').hide();
      $('.controls-3d').show();
      init();
      $('#input-title').text('Voxel Input');
      updateOutput();
    }
  });

  $('#color-scheme-mv').click(function() {
    if (!($(this).hasClass('active'))) {
      colorSchemeExtended = false;
      $('.color-scheme-picker').removeClass('active');
      $(this).addClass('active');
      updateOutput();
    }
  });

  $('#color-scheme-extended').click(function() {
    if (!($(this).hasClass('active'))) {
      colorSchemeExtended = true;
      $('.color-scheme-picker').removeClass('active');
      $(this).addClass('active');
      updateOutput();
    }
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
  updateViewer(creaseGrid(computeCorners(parseGrid())));
};

// Parses the pixel input into a 2D array or the 3D input into a 3D array
function parseGrid() {
  var grid = [];
  if (inputMode3D) {
    // Handle empty grid
    if (!voxels.length) {
      return [[0]];
    }

    var i, inGrid;
    // Determine the smallest 3D array size necessary to fit the drawn voxels
    var voxX = [], voxY = [], voxZ = [];
    for (i = 0; i < voxels.length; i++) {
      voxX.push(voxels[i][0]);
      voxY.push(voxels[i][1]);
      voxZ.push(voxels[i][2]);
    }
    // Shift the voxels towards the origin as much as possible, leaving a size 1 border in the xy plane
    var minX = Math.min(...voxX) - 1, minY = Math.min(...voxY) - 1, minZ = Math.min(...voxZ);
    for (i = 0; i < voxels.length; i++) {
      voxX[i] -= minX;
      voxY[i] -= minY;
      voxZ[i] -= minZ;
    }

    // for (var x = 0; x <= Math.max(...voxX) + 1; x++) {
    //   grid.push([]);
    //   for (var y = 0; y <= Math.max(...voxY) + 1; y++) {
    //     grid[x].push([]);
    //     for (var z = 0; z <= Math.max(...voxZ); z++) {
    //       inGrid = false;
    //       for (i = 0; i < voxels.length; i++) {
    //         if (x === voxX[i] && y === voxY[i] && z === voxZ[i]) {
    //           inGrid = true;
    //         }
    //       }
    //       if (inGrid) {
    //         grid[x][y].push(1);
    //       } else {
    //         grid[x][y].push(0);
    //       }
    //     }
    //   }
    // }

    // TODO: This currently returns just the slice of the input at z = 0,
    // make corner computation accept 3D inputs (use commented out section above)
    for (var x = 0; x <= Math.max(...voxX) + 1; x++) {
      grid.push([]);
      for (var y = 0; y <= Math.max(...voxY) + 1; y++) {
        inGrid = false;
        for (i = 0; i < voxels.length; i++) {
          if (x === voxX[i] && y === voxY[i] && 0 === voxZ[i]) {
            inGrid = true;
          }
        }
        if (inGrid) {
          grid[x].push(1);
        } else {
          grid[x].push(0);
        }
      }
    }
  } else {
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
  }
  return grid;
};

function updateViewer(grid) {
  // Clear any existing crease pattern
  draw.clear();

  // Figure out scale factor to fit into viewer window
  var scale;
  if (grid.w > grid.h) {
    scale = VIEWER_SIZE / grid.w;
  } else {
    scale = VIEWER_SIZE / grid.h;
  }

  // Draw paper
  draw.rect(grid.w * scale, grid.h * scale).attr({ fill: '#fff' }).stroke({ width: 3 });

  // Draw creases
  grid.creaseSet.forEach(function(crease) {
    // Flip the y-axis for drawing to screen
    if (crease.color === 'M') {
      // Mountains are red
      draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).stroke({ width: 1, color: '#f00' });
    } else if (crease.color === 'V') {
      // Valleys are blue
      draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).attr('fill', 'none').stroke({ width: 1, color: '#00f', dasharray: '5, 5' });
    } else if (crease.color === 'M90') {
      if (colorSchemeExtended) {
        // 90-degree mountain folds are orange
        draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).stroke({ width: 1, color: '#FFA500' });
      } else {
        // MV colors; mountain folds are red
        draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).stroke({ width: 1, color: '#f00' });
      }
    } else if (crease.color === 'V90') {
      if (colorSchemeExtended) {
        // 90-degree valley folds are green
        draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).stroke({ width: 1, color: '#008000' });
      } else {
        // MV colors; valley folds are blue
        draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).attr('fill', 'none').stroke({ width: 1, color: '#00f', dasharray: '5, 5' });
      }
    } else if (crease.color === 'C') {
      if (colorSchemeExtended) {
        // Triangle of corner folds are purple
        draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).stroke({ width: 1, color: '#800080' });
      } else {
        // MV colors; valley folds are blue
        draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).attr('fill', 'none').stroke({ width: 1, color: '#00f', dasharray: '5, 5' });
      }
    } else {
      // By default, draw in black
      draw.line(crease.endpoints[0].x * scale, (grid.h - crease.endpoints[0].y) * scale, crease.endpoints[1].x * scale, (grid.h - crease.endpoints[1].y) * scale).stroke({ width: 1, color: '#000' });
    }
  });

  // Update SVG export
  $('#export-svg').attr('href', 'data:image/svg+xml;utf8,' + unescape($('#viewer svg')[0].outerHTML));
};