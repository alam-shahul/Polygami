var width = 10;
var height = 10;

$(document).ready(function() {
  // Initialize the grid
  setupGrid();

  $('#update-grid-size').click(function() {
    width = $('#width').val();
    height = $('#height').val();
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
  updateViewer(pattern);
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

function updateViewer(pattern) {
  // TODO input crease pattern into FOLD viewer
};
