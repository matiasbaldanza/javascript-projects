/* DOM elements */
const boardElement = document.querySelector('[board]');
const cellElements = document.querySelectorAll('[cell]');

/* GLOBALS */
let crossTurn = true;     // Initial turn for the CROSS
const crossClass = 'cross';
const circleClass = 'circle';
const winningCombinations = [
    [0, 1, 2],  // horizontal wins
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],  // vertical wins
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],  // diagonal wins
    [2, 4, 6]
];


/* EVENT LISTENERS */
boardElement.addEventListener( "click", handleClick );

/* GAME FUNCTIONS */

function handleClick(e) {
    const cell = e.target;
    const currentMark = crossTurn ? crossClass : circleClass;
    const cellIsMarked = cell.classList.contains(crossClass) ||
                         cell.classList.contains(circleClass); 

    if (cellIsMarked) return;

    placeMark(cell, currentMark);

    if (currentMarkWins(currentMark)) {
        alert(`WINS: ${currentMark}`);
        return;
    } 
    
    if (boardIsFull(currentMark)) {
        alert(`It's a DRAW!`);
        return;
    } 
    
    swapTurns();
}

function placeMark(cell, markToAdd) {
    cell.classList.add(markToAdd);
}

function swapTurns() {
    crossTurn = !crossTurn;
}

function currentMarkWins(currentMark) {
    // check if SOME winning combination 
    // matches EVERY cell with the board in the current mark

    return winningCombinations.some(combination => {
        return combination.every(cell => {
            return cellElements[cell].classList.contains(currentMark);
        })
    });
}

function boardIsFull() {
    // If every cell is marked

    return [...cellElements].every(cell => {
        return cell.classList.contains(crossClass) ||
        cell.classList.contains(circleClass); 
    });
}



