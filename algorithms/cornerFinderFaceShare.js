function len(x) {return x.length;}

// computeCorners takes an N * M matrix of 0s and 1s, where 1s represent extruded 1x1x1 cubes
// on the surface of the paper.
// It creates an ordering of the extruded cubes, puts them on a sufficiently large piece of paper
// and
function computeCorners(pixelMatrix) {
    var N = len(pixelMatrix);
    var M = len(pixelMatrix[0]);
    console.log(N, M);

    var deepCopy = [];
    for(var i = 0; i < N; i++) {
        deepCopy.push([]);
        for(var j = 0; j < M; j++) {
            deepCopy[i].push(pixelMatrix[i][j]);
        }
    }

    var faceShareInformation = computeFaceShare(deepCopy);

    var faceShareMatrix = faceShareInformation[0];
    var faceShareRows = faceShareInformation[1];
    var faceShareColumns = faceShareInformation[2];

    var rowPadding = [];
    var columnPadding = [];

    // Create arrays filled with 0s
    while(rowPadding.push(0) < N);
    while(columnPadding.push(0) < M);

    var numberOfOnes = 0;
    for(var i = 0; i < N; i++) {
        for(var j = 0; j < M; j++) {
            if(pixelMatrix[i][j] == 1) {
                numberOfOnes += 1;
                rowPadding[i] = 1;
                columnPadding[j] = 1;
            }
        }
    }

    // Debug statements
    // console.log(numberOfOnes);
    //
    // console.log(rowPadding);
    // console.log(columnPadding);

    var cumulativeRowPadding = [];
    var cumulativeColumnPadding = [];

    cumulativeRowPadding.push(rowPadding[0]);
    cumulativeColumnPadding.push(columnPadding[0]);

    while(cumulativeRowPadding.push(cumulativeRowPadding[cumulativeRowPadding.length - 1]
        + rowPadding[cumulativeRowPadding.length - 1] + rowPadding[cumulativeRowPadding.length]) < N);
    while(cumulativeColumnPadding.push(cumulativeColumnPadding[cumulativeColumnPadding.length - 1]
        + columnPadding[cumulativeColumnPadding.length - 1] + columnPadding[cumulativeColumnPadding.length]) < M);

    var order = 1;

    var orderMatrix = pixelMatrix.slice();

    for(var i = 0; i < N; i++) {
        for(var j = 0; j < M; j++) {
            if(pixelMatrix[i][j] == 1) {
                orderMatrix[i][j] = order;
                order += 1;
            }
        }
    }
    // console.log(orderMatrix);

    var oldN = N;
    N = N + cumulativeRowPadding[N-1] + rowPadding[N-1];
    var oldM = M;
    M = M + cumulativeColumnPadding[M-1] + columnPadding[M-1];

    var corner = [];

    for(var i = 0; i < N; i++) {
        corner.push([]);
        for(var j = 0; j < M; j++) {
            corner[i].push(0);
        }
    }

    var grid = new Grid(len(corner), len(corner[0]));

    var columnSum = [];
    // fill it with 0s
    while(columnSum.push(0) < M);

    Array.prototype.at = function(location) {
        if(location > this.length || location < 0)
            return [];
        else {
            return this[location];
        }
    }

    for(var i = 0; i < oldN; i++) {
        var rowSum = 0;
        for(var j = 0; j < oldM; j++) {
            // Fill everything that isn't a corner
            corner[i + cumulativeRowPadding[i]][j + cumulativeColumnPadding[j]] = orderMatrix[i][j];

            if(orderMatrix[i][j] !== 0) {
                // Add corresponding extruded face
                grid.extruded[Point.toString(i + cumulativeRowPadding[i], j + cumulativeColumnPadding[j])] = new Point(i + cumulativeRowPadding[i],  j + cumulativeColumnPadding[j]);

                // bottom left
                // if( faceShareRows.at(i-1).includes('TopRight') || faceShareColumns.at(j-1).includes('TopRight')
                //     || (faceShareRows[i].includes('BottomLeft') && faceShareColumns[j].includes('BottomLeft')) ) {
                if(faceShareRows[i] && faceShareColumns[j]) {
                    corner[i + cumulativeRowPadding[i] - 1][j + cumulativeColumnPadding[j] - 1] = -orderMatrix[i][j];
                    grid.corners[Point.toString(i + cumulativeRowPadding[i] - 1, j + cumulativeColumnPadding[j] - 1)]
                        = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] - 1 + 1, j + cumulativeColumnPadding[j] - 1 + 1), Corner.directions.bottomLeft);
                }
                // top left
                // if( faceShareRows.at(i-1).includes('BottomRight') || faceShareColumns.at(j+1).includes('BottomRight')
                //     || (faceShareRows[i].includes('TopLeft') && faceShareColumns[j].includes('TopLeft')) ) {
                if(faceShareRows[i] && faceShareColumns[j+1]) {
                    corner[i + cumulativeRowPadding[i] - 1][j + cumulativeColumnPadding[j] + 1] = -orderMatrix[i][j];
                    grid.corners[Point.toString(i + cumulativeRowPadding[i] - 1, j + cumulativeColumnPadding[j] + 1)]
                        = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] - 1 + 1, j + cumulativeColumnPadding[j] + 1), Corner.directions.topLeft);
                }

                // top right
                // if( faceShareRows.at(i+1).includes('BottomLeft') || faceShareColumns.at(j+1).includes('BottomLeft')
                //     || (faceShareRows[i].includes('TopRight') && faceShareColumns[j].includes('TopRight')) ) {
                if(faceShareRows[i+1] && faceShareColumns[j+1]) {
                    corner[i + cumulativeRowPadding[i] + 1][j + cumulativeColumnPadding[j] + 1] = -orderMatrix[i][j];
                    grid.corners[Point.toString(i + cumulativeRowPadding[i] + 1, j + cumulativeColumnPadding[j] + 1)]
                        = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] + 1, j + cumulativeColumnPadding[j] + 1), Corner.directions.topRight);
                }
                // bottom right
                if(faceShareRows[i+1] && faceShareColumns[j]) {
                // if( faceShareRows.at(i+1).includes('TopLeft') || faceShareColumns.at(j-1).includes('TopLeft')
                //     || (faceShareRows[i].includes('BottomRight') && faceShareColumns[j].includes('BottomRight')) ) {
                    corner[i + cumulativeRowPadding[i] + 1][j + cumulativeColumnPadding[j] - 1] = -orderMatrix[i][j];
                    grid.corners[Point.toString(i + cumulativeRowPadding[i] + 1, j + cumulativeColumnPadding[j] - 1)]
                        = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] + 1, j + cumulativeColumnPadding[j] - 1 + 1), Corner.directions.bottomRight);
                }
            }
        }
    }

    console.log(corner);
    return grid;
}

function computeFaceShare(pixelMatrix) {
    var N = len(pixelMatrix);
    var M = len(pixelMatrix[0]);

    var result = [];

    for(var i = 0; i < N; i++) {
        result.push([]);
        for(var j = 0; j < M; j++) {
            result[i].push([]);
        }
    }

    // var rows = [];
    // while(rows.push([]) < N);
    // var columns = [];
    // while(columns.push([]) < M);

    var rows = [];
    while(rows.push(false) <= N);
    var columns = [];
    while(columns.push(false) <= M);

    console.log(rows);
    console.log(columns);

    while(true) {
        var numberOfOnes = 0;
        var cumulativeSum = [];
        for(var i = 0; i < N; i++) {
            cumulativeSum.push([]);
            for(var j = 0; j < M; j++) {
                cumulativeSum[i].push(0);
                if(pixelMatrix[i][j] == 1) {
                    numberOfOnes += 1;
                    cumulativeSum[i][j] = 1;

                }
                if( i > 0 ) {
                    cumulativeSum[i][j] += cumulativeSum[i - 1][j];
                }

                if( j > 0 ) {
                    cumulativeSum[i][j] += cumulativeSum[i][j - 1];
                }

                if( (i > 0) && (j > 0) ) {
                    cumulativeSum[i][j] -= cumulativeSum[i - 1][j - 1];
                }
            }
        }

        if(numberOfOnes === 0) {
            // break because we are done assinging each pixel to some rectangle
            break;
        }

        function countOnes(x1, y1, x2, y2) {
            var ret = cumulativeSum[x2][y2];
            if(x1 > 0)
                ret -= cumulativeSum[x1-1][y2];
            if(y1 > 0)
                ret -= cumulativeSum[x2][y1-1];
            if((x1 > 0) && (y1 > 0))
                ret += cumulativeSum[x1-1][y1-1];
            return ret;
        }

        var largestTop = 0;
        var largestLeft = 0;
        var largestBottom = 1;
        var largestRight = 1;
        var maxArea = -1;

        for(var top = 0; top < N; top++) {
            for(var right = 0; right < M; right++) {
                for(var bottom = 0; bottom <= top; bottom++) {
                    for(var left = 0; left <= right; left++) {
                        var numOnes = countOnes(bottom, left, top, right);
                        var area = (top-bottom+1) * (right-left+1);
                        if(numOnes === area) {
                            if(area > maxArea) {
                                maxArea = area;
                                largestTop = top;
                                largestRight = right;
                                largestLeft = left;
                                largestBottom = bottom;
                            }
                        }
                    }
                }
            }
        }

        console.log(maxArea);
        console.log(largestTop, largestRight, largestBottom, largestLeft);
        result[largestTop][largestRight].push('TopRight');
        // topRightList.push();
        // TODO: Figure out WTF is going on
        result[largestTop][largestLeft].push('BottomRight');
        result[largestBottom][largestRight].push('TopLeft');
        result[largestBottom][largestLeft].push('BottomLeft');

        rows[largestBottom] = true;
        rows[largestTop+1] = true;
        columns[largestLeft] = true;
        columns[largestRight+1] = true;

        for(var i = largestBottom; i <= largestTop; i++) {
            for(var j = largestLeft; j <= largestRight; j++) {
                pixelMatrix[i][j] = 0;
            }
        }
    }

    console.log(result);
    console.log(rows);
    console.log(columns);

    return [result, rows, columns];
}

// computeCorners([[1, 0, 1],[0, 1, 0]]);

computeFaceShare([[1, 1, 1],[1, 1, 0]]);
