const fs = require('fs');
const { exampleBoard } = require('./ExampleInput');

function createBoard(rows, cols) {
    return Array.from({ length: rows }, (_, rowIndex) => 
        Array.from({ length: cols }, (_, colIndex) => {
            if (rowIndex === 0 || rowIndex === rows - 1 || colIndex === 0 || colIndex === cols - 1) {
                return 'X';
            } else if (Math.random() < 0.1) {
                return 'Y';
            } else {
                return '0';
            }
        })
    );
}

function saveBoardToFile(board) {
    const boardString = `const exampleBoard = ${JSON.stringify(board, null, 4)}; \nmodule.exports = { exampleBoard };`;
    fs.writeFileSync('ExampleInput.js', boardString);
}

// Create and save the board
const rows = 8;
const cols = 8;
const board = createBoard(rows, cols);
saveBoardToFile(board);

// ---------------------------------------------------------------------------------------


function printBoard(board) {
    console.clear();
    board.forEach(row => {
        console.log(row.join(' '));
    });
    console.log('');
}

function getRandomCorner(rows, cols) {
    const corners = [
        { row: 1, col: 1 },
        { row: 1, col: cols - 2 },
        { row: rows - 2, col: 1 },
        { row: rows - 2, col: cols - 2 }
    ];
    return corners[Math.floor(Math.random() * corners.length)];
}

function getRandomDirection(exclude) {
    const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
        { row: -1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 1 },
        { row: -1, col: -1 }
    ];
    if (exclude) {
        const filteredDirections = directions.filter(dir => dir.row !== -exclude.row || dir.col !== -exclude.col);
        return filteredDirections[Math.floor(Math.random() * filteredDirections.length)];
    }
    
    return directions[Math.floor(Math.random() * directions.length)];
}

function moveBall(board, position, direction) {
    let { row, col } = position;
    board[row][col] = '0';

    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (board[newRow][newCol] === 'X') {
        direction = getRandomDirection(direction);
    } else if(board[newRow][newCol] === 'Y') {
        direction = getRandomDirection(direction);
        board[newRow][newCol] = '0';
        position.row = newRow;
        position.col = newCol;
    } else {
        position.row = newRow;
        position.col = newCol;
    }
    board[position.row][position.col] = '1';

    printBoard(board);
    return { position, direction };
}

// this is where the magic happens
function startSimulation(board) {
    let rows = board.length;
    let cols = board[0].length;
    let position = getRandomCorner(rows, cols);
    let direction = getRandomDirection();
    board[position.row][position.col] = '1';

    printBoard(board);

    setInterval(() => {
        const result = moveBall(board, position, direction);
        position = result.position;
        direction = result.direction;
    }, 1000);
}

startSimulation(exampleBoard);
