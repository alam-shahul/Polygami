function creaseGrid(grid) {
  // If grid does not contain corners, then creaseGrid does nothing and returns the input grid.
  if($.isEmptyObject(grid.corners)) {
    return grid;
  }
  
  //
  var corner;
  var currentX;
  var currentY;

  // Go through corners in priority order
  for(var currPriority = 1; currPriority <= grid.corners.length/4; currPriority ++) {
    // Make dictionary of Corners with priority = currPriority
    var currCorners = {}
    for(var j in grid.corners) {
      if(j.priority === currPriority) {
        currCorners[Point.toString(j.tip.x, j.tip.y)] = j;
      }
    }
    
    // Iterate through Corners of priority = currPriority
    for(var i = 0; i < currCorners.length; i++) {
      corner = currCorners[i];
      // Add outline of extruded faces
      if (corner.direction === 0) {
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x-1, corner.tip.y), "orange");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x, corner.tip.y-1), "orange");
      }
      else if (corner.direction === 1) {
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x-1, corner.tip.y), "orange");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x, corner.tip.y+1), "orange");
      }
      else if (corner.direction === 2) {
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x+1, corner.tip.y), "orange");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x, corner.tip.y-1), "orange");
      }
      else if (corner.direction === 3) {
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x+1, corner.tip.y), "orange");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x, corner.tip.y+1), "orange");
      }

      // Draw outside mountains
      currentX = corner.tip.x;
      currentY = corner.tip.y;
      while(currentX % grid.w !== 0 && currentY % grid.h !== 0) {
        if (corner.direction === 0) {
        }
        else if (corner.direction === 1) {
        }
        else if (corner.direction === 2) {
        }
        else if (corner.direction === 3) {
        }
      }
    }
  }
}