var width = 10;
var height = 10;

const VIEWER_SIZE = 600;

var draw;
var colorSchemeExtended = true;
var inputMode = '3d';

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

  $('#generate-crease-pattern, #color-faces').click(function() {
    updateOutput();
  });

  $('#face-color').change(function() {
    updateOutput();
  });

  $('#text-input').keyup(function(e) {
    // Ignore the arrow keys
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      return;
    }
    writeTextToGrid($('#text-input').val());
    updateOutput();
  });

  $('#input-mode-2d').click(function() {
    if (!($(this).hasClass('active'))) {
      inputMode = '2d';
      $('.input-mode-picker').removeClass('active');
      $(this).addClass('active');
      $('#grid').show();
      $('.controls-2d').show();
      $('.controls-3d').hide();
      $('.controls-text').hide();
      $('#input-3d').empty();
      $('#input-3d').hide();
      $('#input-title').text('Pixel Input');
      updateOutput();
    }
  });

  $('#input-mode-3d').click(function() {
    if (!($(this).hasClass('active'))) {
      inputMode = '3d';
      $('.input-mode-picker').removeClass('active');
      $(this).addClass('active');
      $('#grid').hide();
      $('#input-3d').show();
      $('.controls-2d').hide();
      $('.controls-3d').show();
      $('.controls-text').hide();
      init();
      render();
      $('#input-title').text('Voxel Input');
      updateOutput();
    }
  });

  $('#input-mode-text').click(function() {
    if (!($(this).hasClass('active'))) {
      inputMode = 'text';
      $('.input-mode-picker').removeClass('active');
      $(this).addClass('active');
      $('#grid').show();
      $('#input-3d').empty();
      $('#input-3d').hide();
      $('.controls-2d').hide();
      $('.controls-3d').hide();
      $('.controls-text').show();
      $('#text-input').focus();
      $('#input-title').text('Text Input');
      writeTextToGrid($('#text-input').val());
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

function writeTextToGrid(text) {
  // Normalize text
  text = text.toUpperCase();

  var i, j, k, newWidth = 1, char, grid = [];

  // Adjust grid size to fit the text, plus a border of 1
  for (i = 0; i < text.length; i++) {
    char = text[i];
    if (font.hasOwnProperty(char)) {
      newWidth += font[char].width + 1; // Include new char plus a space
    }
  }
  width = newWidth;
  height = 7; // All chars in our font are height 5
  $('#width').val(width);
  $('#height').val(height);
  setupGrid();

  // Update grid to show the text
  var col = 1;
  for (i = 0; i < text.length; i++) {
    char = text[i];
    if (font.hasOwnProperty(char)) {
      for (j = 0; j < font[char].pixels.length; j++) {
        for (k = 0; k < font[char].pixels[j].length; k++) {
          if (font[char].pixels[j][k] === 1) {
            $('#' + (col + k) + '-' + (height - j - 2)).addClass('filled');
          }
        }
      }
      col += font[char].width + 1;
    }
  }
};

// Update the crease pattern and 3D viewer
function updateOutput() {
  updateViewer(creaseGrid(computeCorners(parseGrid())));
};

// Parses the pixel input into a 2D array or the 3D input into a 3D array
function parseGrid() {
  var grid = [];
  if (inputMode === '3d') {
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

  // Color extruded pixels
  // TODO: Figure out a better way to color pixel sides;
  // right now the strategy is to find pixels in between orange and green strokes, which colors too many pixels
  if ($('#color-faces').is(':checked')) {
    for (var pixel in grid.extruded) {
      if (grid.extruded.hasOwnProperty(pixel)) {
        pixel = grid.extruded[pixel];
        draw.rect(scale, scale).fill($('#face-color').val()).move(pixel.x * scale, (grid.h - pixel.y - 1) * scale);
      }
    }

    // Color extruded pixel sides
    grid.creaseSet.forEach(function(crease) {
      if (crease.color === 'V90') {
        // TODO: Ignoring doubly-drawn creases for now; this needs to be fixed in crease generation
        var dups = [];
        var array = grid.creases[Point.toString(crease.endpoints[0].x, crease.endpoints[0].y)];
        var i;
        for (i = 0; i < array.length; i++) {
          if (array[i].equalsColorBlind(crease)) {
            dups.push(array[i]);
          }
        }
        array = grid.creases[Point.toString(crease.endpoints[1].x, crease.endpoints[1].y)];
        for (i = 0; i < array.length; i++) {
          if (array[i].equalsColorBlind(crease)) {
            dups.push(array[i]);
          }
        }
        if (dups.length > 2) {
          // There's a doubly-drawn crease; skip
          return;
        }

        if (crease.endpoints[0].y === crease.endpoints[1].y) {
          // Check bounds
          if (crease.endpoints[0].y !== 0 && crease.endpoints[0].y !== grid.h) {
            // If this is a left-to-right stroke, check above and below
            if (grid.creaseExists(new Crease(grid.point(crease.endpoints[0].x, crease.endpoints[0].y + 1), grid.point(crease.endpoints[1].x, crease.endpoints[1].y + 1), 'M90'))) {
              // Color the pixel above
              draw.rect(scale / 2, scale).fill($('#face-color').val()).move(Math.min(crease.endpoints[0].x, crease.endpoints[1].x) * scale, (grid.h - crease.endpoints[0].y - 1) * scale);
            }
            if (grid.creaseExists(new Crease(grid.point(crease.endpoints[0].x, crease.endpoints[0].y - 1), grid.point(crease.endpoints[1].x, crease.endpoints[1].y - 1), 'M90'))) {
              // Color the pixel below
              draw.rect(scale / 2, scale).fill($('#face-color').val()).move(Math.min(crease.endpoints[0].x, crease.endpoints[1].x) * scale, (grid.h - crease.endpoints[0].y) * scale);
            }
          }
        } else {
          // Check bounds
          if (crease.endpoints[0].x !== 0 && crease.endpoints[0].x !== grid.w) {
            // If this is an up-to-down stroke, check left and right
            if (grid.creaseExists(new Crease(grid.point(crease.endpoints[0].x - 1, crease.endpoints[0].y), grid.point(crease.endpoints[1].x - 1, crease.endpoints[1].y), 'M90'))) {
              // Color the pixel to the left
              draw.rect(scale, scale / 2).fill($('#face-color').val()).move((crease.endpoints[0].x - 1) * scale, (grid.h - Math.max(crease.endpoints[0].y, crease.endpoints[1].y)) * scale);
            }
            if (grid.creaseExists(new Crease(grid.point(crease.endpoints[0].x + 1, crease.endpoints[0].y), grid.point(crease.endpoints[1].x + 1, crease.endpoints[1].y), 'M90'))) {
              // Color the pixel below
              draw.rect(scale, scale / 2).fill($('#face-color').val()).move(crease.endpoints[0].x * scale, (grid.h - Math.max(crease.endpoints[0].y, crease.endpoints[1].y)) * scale);
            }
          }
        }
      }
    });
  }

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