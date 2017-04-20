function len(x) {return x.length;}

// computeCorners takes an N * M matrix of 0s and 1s, where 1s represent extruded 1x1x1 cubes
// on the surface of the paper.
// It creates an ordering of the extruded cubes, puts them on a sufficiently large piece of paper
// and
function computeCorners(pixelMatrix) {
    var N = len(pixelMatrix);
    var M = len(pixelMatrix[0]);

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
                rowPadding[i] += 1;
                columnPadding[j] += 1;
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

    // console.log(cumulativeRowPadding);
    // console.log(cumulativeColumnPadding);

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
    N = N + 2 * numberOfOnes;
    var oldM = M;
    M = M + 2 * numberOfOnes;

    var corner = [];

    for(var i = 0; i < N; i++) {
        corner.push([]);
        for(var j = 0; j < M; j++) {
            corner[i].push(0);
        }
    }

    var grid = new Grid(len(corner[0]), len(corner));

    var columnSum = [];
    // fill it with 0s
    while(columnSum.push(0) < M);

    for(var i = 0; i < oldN; i++) {
        var rowSum = 0;
        for(var j = 0; j < oldM; j++) {
            if(pixelMatrix[i][j] != 0) {
                rowSum += 1;
                columnSum[j] += 1;
            }
            // Fill everything that isn't a corner
            corner[i + cumulativeRowPadding[i]][j + cumulativeColumnPadding[j]] = orderMatrix[i][j];

            if(orderMatrix[i][j] !== 0) {
                // Add corresponding extruded face
                grid.extruded[Point.toString(i + cumulativeRowPadding[i], j + cumulativeColumnPadding[j])] = new Point(i + cumulativeRowPadding[i],  j + cumulativeColumnPadding[j]);

                // bottom left
                corner[i + cumulativeRowPadding[i] - rowSum][j + cumulativeColumnPadding[j] - columnSum[j]] = -orderMatrix[i][j];
                grid.corners[Point.toString(i + cumulativeRowPadding[i] - rowSum, j + cumulativeColumnPadding[j] - columnSum[j])]
                    = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] - rowSum + 1, j + cumulativeColumnPadding[j] - columnSum[j] + 1), Corner.directions.bottomLeft);

                // top left
                corner[i + cumulativeRowPadding[i] - rowSum][j + cumulativeColumnPadding[j] + columnSum[j]] = -orderMatrix[i][j];
                grid.corners[Point.toString(i + cumulativeRowPadding[i] - rowSum, j + cumulativeColumnPadding[j] + columnSum[j])]
                    = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] - rowSum + 1, j + cumulativeColumnPadding[j] + columnSum[j]), Corner.directions.topLeft);

                // top right
                corner[i + cumulativeRowPadding[i] + rowSum][j + cumulativeColumnPadding[j] + columnSum[j]] = -orderMatrix[i][j];
                grid.corners[Point.toString(i + cumulativeRowPadding[i] + rowSum, j + cumulativeColumnPadding[j] + columnSum[j])]
                    = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] + rowSum, j + cumulativeColumnPadding[j] + columnSum[j]), Corner.directions.topRight);

                // bottom right
                corner[i + cumulativeRowPadding[i] + rowSum][j + cumulativeColumnPadding[j] - columnSum[j]] = -orderMatrix[i][j];
                grid.corners[Point.toString(i + cumulativeRowPadding[i] + rowSum, j + cumulativeColumnPadding[j] - columnSum[j])]
                    = new Corner(orderMatrix[i][j], new Point(i + cumulativeRowPadding[i] + rowSum, j + cumulativeColumnPadding[j] - columnSum[j] + 1), Corner.directions.bottomRight);
            }
        }
    }

    console.log(corner);
    return grid;
}

computeCorners([[1, 0, 1],[0, 1, 0]]);
