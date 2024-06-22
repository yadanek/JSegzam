
function createGrid(rows, cols) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0);
    }
    return grid;
}


function initialize(grid, pattern) {
    for (let [row, col] of pattern) {
        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
            grid[row][col] = 1;
        }
    }
}


function nextGeneration(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let newGrid = createGrid(rows, cols);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let liveNeighbors = countLiveNeighbors(grid, row, col);

            if (grid[row][col] === 1) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    newGrid[row][col] = 0; // umiera
                } else {
                    newGrid[row][col] = 1; // pozostaje żywa
                }
            } else {
                if (liveNeighbors === 3) {
                    newGrid[row][col] = 1; // zmartwychwstaje
                }
            }
        }
    }

    return newGrid;
}

// Liczy żywych sąsiadów danej komórki
function countLiveNeighbors(grid, row, col) {
    let directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;
    for (let [dx, dy] of directions) {
        let newRow = row + dx;
        let newCol = col + dy;

        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            count += grid[newRow][newCol];
        }
    }
    //console.log(`miejsce ${row} i ${col} ma ${count} żywych sąsiadów`)
    return count;
}

function printGrid(grid) {
    for (let row = 0; row < grid.length; row++) {
        let line = grid[row].map(cell => (cell ? 'O' : '.')).join(' ');
        console.log(line);
    }
    console.log('\n');
}

// Przykład użycia:
let rows = 10;
let cols = 10;
let grid = createGrid(rows, cols);

//  wzorzec (glider)
// let pattern = [
//     [1, 2], [2, 3], [3, 1], [3, 2], [3, 3]
// ];
//wzorzec dakota
// let pattern = [
//     [0, 1], [0,4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2]
// ];
// wzorzec stały klocek
// let pattern = [
//     [1,1], [1,2], [2,1], [2,2]
// ];
//wrzorzec stały - koniczyna
let pattern = [
    [1,2], [2,1], [2,3], [3,2]
];
 const numberOfGenerations = 6;

initialize(grid, pattern);
console.log("First generation:");
printGrid(grid);

for (let i = 0; i < numberOfGenerations-1 ; i++) {
    grid = nextGeneration(grid);
    console.log(`Generation ${i + 2}:`);
    printGrid(grid);
}
