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
//  for(var currPriority = 1; currPriority <= grid.corners.length/4; currPriority ++) {
//    // Make dictionary of Corners with priority = currPriority
//    var currCorners = {}
//    for(var j in grid.corners) {
//      if(j.priority === currPriority) {
//        currCorners[Point.toString(j.tip.x, j.tip.y)] = j;
//      }
//    }
    
//    // Iterate through Corners of priority = currPriority
//    for(var i = 0; i < currCorners.length; i++) {
//      corner = currCorners[i];

    for(var i in grid.corners) {
      corner = grid.corners[i];
      console.log(corner);
      // Draw outside mountains
      if (corner.direction === 0) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY - 0.5), "M");
          currentY -= 0.5;
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX - 0.5, currentY), "M");
          currentX -= 0.5;
        }
      }
      else if (corner.direction === 1) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY - 0.5), "M");
          currentY -= 0.5;
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX + 0.5, currentY), "M");
          currentX += 0.5;
        }
      }
      else if (corner.direction === 2) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY + 0.5), "M");
          currentY += 0.5;
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX - 0.5, currentY), "M");
          currentX -= 0.5;
        }
      }
      else if (corner.direction === 3) {
        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY + 0.5), "M");
          currentY += 0.5;
        }

        currentX = corner.tip.x;
        currentY = corner.tip.y;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX + 0.5, currentY), "M");
          currentX += 0.5;
        }
      }

      // Draw inside valleys and corner folds
      if (corner.direction === 0) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 0.5, corner.tip.y - 1), "V");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 1, corner.tip.y - 0.5), "V");
        grid.addCrease(new Point(corner.tip.x - 0.5, corner.tip.y - 1), new Point(corner.tip.x - 1, corner.tip.y - 0.5), "V");

        currentX = corner.tip.x - 0.5;
        currentY = corner.tip.y - 1;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY - 0.5), "V");
          currentY -= 0.5;
        }

        currentX = corner.tip.x - 1;
        currentY = corner.tip.y - 0.5;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX - 0.5, currentY), "V");
          currentX -= 0.5;
        }
      }

      else if (corner.direction === 1) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 0.5, corner.tip.y - 1), "V");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 1, corner.tip.y - 0.5), "V");
        grid.addCrease(new Point(corner.tip.x + 0.5, corner.tip.y - 1), new Point(corner.tip.x + 1, corner.tip.y - 0.5), "V");

        currentX = corner.tip.x + 0.5;
        currentY = corner.tip.y - 1;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY - 0.5), "V");
          currentY -= 0.5;
        }

        currentX = corner.tip.x + 1;
        currentY = corner.tip.y - 0.5;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX + 0.5, currentY), "V");
          currentX += 0.5;
        }
      }

      else if (corner.direction === 2) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 0.5, corner.tip.y + 1), "V");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x - 1, corner.tip.y + 0.5), "V");
        grid.addCrease(new Point(corner.tip.x - 0.5, corner.tip.y + 1), new Point(corner.tip.x - 1, corner.tip.y + 0.5), "V");

        currentX = corner.tip.x - 0.5;
        currentY = corner.tip.y + 1;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY + 0.5), "V");
          currentY += 0.5;
        }

        currentX = corner.tip.x - 1;
        currentY = corner.tip.y + 0.5;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX - 0.5, currentY), "V");
          currentX -= 0.5;
        }
      }

      else if (corner.direction === 3) {
        // Corner folds
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 0.5, corner.tip.y + 1), "V");
        grid.addCrease(new Point(corner.tip.x, corner.tip.y), new Point(corner.tip.x + 1, corner.tip.y + 0.5), "V");
        grid.addCrease(new Point(corner.tip.x + 0.5, corner.tip.y + 1), new Point(corner.tip.x + 1, corner.tip.y + 0.5), "V");

        currentX = corner.tip.x + 0.5;
        currentY = corner.tip.y + 1;
        while(currentY % grid.h !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX, currentY + 0.5), "V");
          currentY += 0.5;
        }

        currentX = corner.tip.x + 1;
        currentY = corner.tip.y + 0.5;
        while(currentX % grid.w !== 0) {
          grid.addCrease(new Point(currentX, currentY), new Point(currentX + 0.5, currentY), "V");
          currentX += 0.5;
        }
      }

//    }
// End of loop for Corners of certain priority
    return grid;
  }
}

g = new Grid(4, 4);
g.corners[Point.toString(1, 1)] = new Corner(1, new Point(2,2), 0);

console.log(g.corners);

creaseGrid(g);

console.log(g.creases);
