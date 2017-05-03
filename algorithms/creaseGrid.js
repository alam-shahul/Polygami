function creaseGrid(grid) {
  // If grid does not contain corners, then creaseGrid does nothing and returns the input grid.
  if($.isEmptyObject(grid.corners)) {
    return grid;
  }
  
  //
  var corner;
  var currentX;
  var currentY;


 for(var i in grid.corners) {
      corner = grid.corners[i];

      if (corner.direction === 0) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 0.5, corner.tip.y - 1), "C");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y - 1), new Point(corner.tip.x - 0.5, corner.tip.y - 1), "M90");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 1, corner.tip.y - 0.5), "C");
        grid.addCrease(new Point(corner.tip.x - 1, corner.tip.y), new Point(corner.tip.x - 1, corner.tip.y - 0.5), "M90");
        grid.addCrease(new Point(corner.tip.x - 0.5, corner.tip.y - 1), new Point(corner.tip.x - 1, corner.tip.y - 0.5), "C");
      }
      else if (corner.direction === 1) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 0.5, corner.tip.y - 1), "C");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y - 1), new Point(corner.tip.x + 0.5, corner.tip.y - 1), "M90");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 1, corner.tip.y - 0.5), "C");
        grid.addCrease(new Point(corner.tip.x + 1, corner.tip.y), new Point(corner.tip.x + 1, corner.tip.y - 0.5), "M90");
        grid.addCrease(new Point(corner.tip.x + 0.5, corner.tip.y - 1), new Point(corner.tip.x + 1, corner.tip.y - 0.5), "C");
      }
      else if (corner.direction === 2) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 0.5, corner.tip.y + 1), "C");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y + 1), new Point(corner.tip.x - 0.5, corner.tip.y + 1), "M90");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 1, corner.tip.y + 0.5), "C");
        grid.addCrease(new Point(corner.tip.x - 1, corner.tip.y), new Point(corner.tip.x - 1, corner.tip.y + 0.5), "M90");
        grid.addCrease(new Point(corner.tip.x - 0.5, corner.tip.y + 1), new Point(corner.tip.x - 1, corner.tip.y + 0.5), "C");
      }
      else if (corner.direction === 3) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 0.5, corner.tip.y + 1), "C");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y + 1), new Point(corner.tip.x + 0.5, corner.tip.y + 1), "M90");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 1, corner.tip.y + 0.5), "C");
        grid.addCrease(new Point(corner.tip.x + 1, corner.tip.y), new Point(corner.tip.x + 1, corner.tip.y + 0.5), "M90");
        grid.addCrease(new Point(corner.tip.x + 0.5, corner.tip.y + 1), new Point(corner.tip.x + 1, corner.tip.y + 0.5), "C");
      }
    }


  // Go through corners in priority order

  function draw() {
  for(var currPriority = Object.keys(grid.corners).length/2; currPriority >0; currPriority --) {
    // Make dictionary of Corners with priority = currPriority
    var currCorners = {}
    for(var j in grid.corners) {
      if(grid.corners[j].priority === currPriority) {
        currCorners[Point.toString(grid.corners[j].tip.x, grid.corners[j].tip.y)] = grid.corners[j];
      }
    }
    
    // Iterate through Corners of priority = currPriority
    for(var i in currCorners) {
      

      corner = currCorners[i];


      
      // Draw outside mountains
      if (corner.direction === 0) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 1) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }
      else if (corner.direction === 2) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 3) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "M", currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      // Draw inside valleys
      if (corner.direction === 0) {

        currentX = corner.tip.x - 0.5;
        currentY = corner.tip.y - 1;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];        }

        currentX = corner.tip.x - 1;
        currentY = corner.tip.y - 0.5;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 1) {

        currentX = corner.tip.x + 0.5;
        currentY = corner.tip.y - 1;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x + 1;
        currentY = corner.tip.y - 0.5;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 2) {

        currentX = corner.tip.x - 0.5;
        currentY = corner.tip.y + 1;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x - 1;
        currentY = corner.tip.y + 0.5;
        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 3) {

        currentX = corner.tip.x + 0.5;
        currentY = corner.tip.y + 1;
        while(currentY % grid.h !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x + 1;
        currentY = corner.tip.y + 0.5;

        while(currentX % grid.w !== 0) {
          var newCoords = chooseCrease(grid, "V", currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      // Draw tip-to-tip creases
      if (corner.direction === 0) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 1) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 2) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 3) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipChooseCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      // Draw creases between sides of corners
      if (corner.direction === 0) {
        currentX = corner.tip.x - 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y - 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 1) {
        currentX = corner.tip.x + 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y - 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 2) {
        currentX = corner.tip.x - 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y + 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 3) {
        currentX = corner.tip.x + 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y + 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersChooseCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }


    }
// End of loop for Corners of certain priority
  }
  }
// End of draw() definition
  function delete90DegreeFolds() {
  for(var currPriority = Object.keys(grid.corners).length/2; currPriority >0; currPriority --) {
    // Make dictionary of Corners with priority = currPriority
    var currCorners = {}
    for(var j in grid.corners) {
      if(grid.corners[j].priority === currPriority) {
        currCorners[Point.toString(grid.corners[j].tip.x, grid.corners[j].tip.y)] = grid.corners[j];
      }
    }
    
    // Iterate through Corners of priority = currPriority
    for(var i in currCorners) {
      corner = currCorners[i];
      // Draw tip-to-tip creases
      if (corner.direction === 0) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 1) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 2) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 3) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        
        while(currentX % grid.w !== 0) {
          var newCoords = tipToTipDeleteCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      // Draw creases between sides of corners
      if (corner.direction === 0) {
        currentX = corner.tip.x - 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y - 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 1) {
        currentX = corner.tip.x + 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, 0, 0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y - 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 2) {
        currentX = corner.tip.x - 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y + 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, 0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

      else if (corner.direction === 3) {
        currentX = corner.tip.x + 1;
        currentY = corner.tip.y;
        
        while(currentY % grid.h !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, 0, -0.5);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y + 1;
        
        while(currentX % grid.w !== 0) {
          var newCoords = sidesOfCornersDeleteCrease(grid, currentX, currentY, -0.5, 0);
          if(newCoords === -1) {
            break;
          }
          currentX = newCoords[0];
          currentY = newCoords[1];
        }
      }

    }
  }  
  }

  draw();
  // Note: delete90DegreeFolds doesn't work, which is a major issue.
  delete90DegreeFolds();
  draw();

  return grid;
}

// Helper function to count how many creases are of a particular orientation at a particular point
function countCreaseByColor(grid, point, color) {
  var count = 0;
  
  var creases = grid.creases[Point.toString(point.x, point.y)];

  if(point.x <= grid.w && point.y <= grid.h) {
    for(var i = 0; i < creases.length; i++) {
      if(creases[i].color === color) {
        count += 1;
      }
    }
  }
  return count;
}

// Helper function to delete creases between sides of corners
function sidesOfCornersDeleteCrease(grid, x, y, xInc, yInc) {
  var countM = countCreaseByColor(grid, new Point(x, y), "M");
  var countV = countCreaseByColor(grid, new Point(x, y), "V");
  var cornerFoldCount = countCreaseByColor(grid, new Point(x, y), "C");
  var countM90 = countCreaseByColor(grid, new Point(x, y), "M90");
  var countV90 = countCreaseByColor(grid, new Point(x, y), "V90");

  // Used for testing whether extruded face has been reached
  var countMAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "M");
  var countVAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "V");

  if(!(grid.creaseExists(new Crease(new Point(x,y), new Point(x - xInc, y - yInc), "M90")))) {
    return -1;
  }
  else {
    grid.deleteCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90");
    grid.deleteCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90");
  }
  

  x += xInc;
  y += yInc;
  
  return [x, y];
}

// Helper function to delete creases between tips of two corners
function tipToTipDeleteCrease(grid, x, y, xInc, yInc) {
  var countM = countCreaseByColor(grid, new Point(x, y), "M");
  var countV = countCreaseByColor(grid, new Point(x, y), "V");
  var cornerFoldCount = countCreaseByColor(grid, new Point(x, y), "C");
  var countM90 = countCreaseByColor(grid, new Point(x, y), "M90");
  var countV90 = countCreaseByColor(grid, new Point(x, y), "V90");

  // Used for testing whether extruded face has been reached
  var countMAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "M");
  var countVAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "V");

  if(!(grid.creaseExists(new Crease(new Point(x,y), new Point(x - xInc, y - yInc), "M90")))) {
    return -1;
  }

  x += xInc;
  y += yInc;
  
  return [x, y];
}

// Helper function to draw between sides of corners
function sidesOfCornersChooseCrease(grid, x, y, xInc, yInc) {
  var countM = countCreaseByColor(grid, new Point(x, y), "M");
  var countV = countCreaseByColor(grid, new Point(x, y), "V");
  var cornerFoldCount = countCreaseByColor(grid, new Point(x, y), "C");
  var countM90 = countCreaseByColor(grid, new Point(x, y), "M90");
  var countV90 = countCreaseByColor(grid, new Point(x, y), "V90");

  // Used for testing whether extruded face has been reached
  var countMAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "M");
  var countVAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "V");

  if(countM90 === 1 && countV90 === 1 && cornerFoldCount === 2) {
    return -1;
  }
  else if(countM90 === 1 && countV90 === 1 && (countCreaseByColor(grid, new Point(x + xInc, y + yInc), "C") === 2) || (countCreaseByColor(grid, new Point(x + xInc, y + yInc), "C") === 4)) {
    return -1;
  }
  

  else if(countVAhead === 2 && countM === 2) {
      grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90");    
  }
  else if(countMAhead === 2 && countV === 2) {
      grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90"); 
  }
  else if(countMAhead === 0 && countVAhead === 0) {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90");    
  }
  else {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90"); 
  }

  x += xInc;
  y += yInc;
  
  return [x, y];
}

// Helper function to draw between tips of two corners
function tipToTipChooseCrease(grid, x, y, xInc, yInc) {
  var countM = countCreaseByColor(grid, new Point(x, y), "M");
  var countV = countCreaseByColor(grid, new Point(x, y), "V");
  var cornerFoldCount = countCreaseByColor(grid, new Point(x, y), "C");
  var countM90 = countCreaseByColor(grid, new Point(x, y), "M90");
  var countV90 = countCreaseByColor(grid, new Point(x, y), "V90");

  // Used for testing whether extruded face has been reached
  var countMAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "M");
  var countVAhead = countCreaseByColor(grid, new Point(x + xInc, y + yInc), "V");

  if(cornerFoldCount === 2 && (grid.creaseExists(new Crease(new Point(x,y), new Point(x - xInc, y - yInc), "M90")))) {
    return -1;
  }
  else if(countM90 === 1 && countV90 === 1) {
    return -1;
  }

  else if(countVAhead === 2 && countM === 2) {
      grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90");    
  }
  else if(countMAhead === 2 && countV === 2) {
      grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90"); 
  }
  else if(countMAhead === 0 && countVAhead === 0) {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90");    
  }
  else {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90"); 
  }

  x += xInc;
  y += yInc;
  
  return [x, y];
}

// Helper function to switch appropriate creases
function chooseCrease(grid, color, x, y, xInc, yInc) {
  var count = countCreaseByColor(grid, new Point(x, y), color);
  var oppCount = countCreaseByColor(grid, new Point(x, y), oppColor(color));
  var cornerFoldCount = countCreaseByColor(grid, new Point(x, y), "C");
  var countM90 = countCreaseByColor(grid, new Point(x, y), "M90");
  var countV90 = countCreaseByColor(grid, new Point(x, y), "V90");

  // For pleat-sharing gadget, don't draw inside valleys if they clash

  if(cornerFoldCount === 2 && color === "V" && count === 1) {
    return -1;
  }

  else if(cornerFoldCount === 4 && color === "V") {
    return -1;
  }

  // Switch orientation of 90-degree folds when an outside mountain runs over them.
  else if(grid.creaseExists(new Crease(new Point(x,y), new Point(x + xInc, y + yInc), "M90")) && color === "M") {
    grid.deleteCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90");
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90");
  }

  else if(grid.creaseExists(new Crease(new Point(x,y), new Point(x + xInc, y + yInc), "V90")) && color === "M") {
    grid.deleteCrease(new Point(x, y), new Point(x + xInc, y + yInc), "V90");
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), "M90");
  }

  // Last check: if outside mountain is entering another corner, stop outside mountain.
  else if(color === "M" && countM90 === 1 && countCreaseByColor(grid, new Point(x + 2*xInc, y+2*yInc), "C") === 2) {
    return -1;
  }
  // Delete superfluous outside mountain folds
  else if(grid.creaseExists(new Crease(new Point(x,y), new Point(x + xInc, y + yInc), "M")) && color === "M") {
    return -1;
  }

  // Ensures that junctions have three creases of the same color and one crease of a different color
  else if(count === 1 && oppCount === 2) {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), oppColor(color));
  }
  else if(count === 3 && oppCount === 0) {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), oppColor(color));
  }

  // Else, draw normal crease
  else {
    grid.addCrease(new Point(x, y), new Point(x + xInc, y + yInc), color);
  }
  x += xInc;
  y += yInc;
  
  return [x, y];
}


// Helper function to get opposite color
function oppColor(color) {
  if(color === "M") {
    return "V";
  }
  else if(color === "V") {
    return "M";
  }
  else if(color === "M90") {
    return "V90";
  }
  else if(color === "V90") {
    return "M90";
  }
}