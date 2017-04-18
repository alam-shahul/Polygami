function creaseGrid(grid) {
  // If grid does not contain corners, then creaseGrid does nothing and returns the input grid.
  if($.isEmptyObject(grid.corners)) {
    return grid;
  }
  
  //
  var corner;
  var currentX;
  var currentY;
  for(var i = 0; i < grid.corners.length; i++) {
    corner = grid.corners[i];
    currentX = corner.tip.x;
    currentY = corner.tip.y;
    while(currentX % grid.w !== 0 && currentY % grid.h !== 0) {
      
    }
  }
}

creaseGrid(new Grid(10,10));