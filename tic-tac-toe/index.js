/* DOM elements */
const boardElement = document.querySelector('[board]');
const cellElements = document.querySelectorAll('[cell]');
const dialogElement = document.querySelector('dialog');
const modalMessageElement = document.querySelector('[winner-message]');

const crossesScoreElement = document.querySelector('[crosses-score]');
const circlesScoreElement = document.querySelector('[circles-score]');
const resetButton = document.querySelector('[reset-btn]');

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
let crossesCumulativeScore = 0;
let circlesCumulativeScore = 0;

// messages
const crossName = 'Crosses';
const circleName = 'Circles';
const winnerMessage = (currentMark) => {
    const winnerName = (currentMark === crossClass) ?
                        crossName :
                        circleName;
    return `The ${winnerName} win!`;
};

startGame();


/* EVENT LISTENERS */
boardElement.addEventListener( "click", handleClick );

dialogElement.addEventListener("close", () => {
    resetGame(); 
    updateScoreOnBoard();   
});

resetButton.addEventListener( "click", resetCumulativeScores );

/* GAME FUNCTIONS */

function startGame() {
    setBoardHover(crossTurn);
    crossTurn = true;
    clearBoard();
}

function clearBoard() {
    cellElements.forEach(cell => {
        cell.classList.remove(crossClass);
        cell.classList.remove(circleClass);
    })
}

function setBoardHover(crossTurn) {
    crossTurn ?
        boardElement.classList.replace('circle-plays', 'cross-plays') :
        boardElement.classList.replace('cross-plays', 'circle-plays');
}

function clearBoardHover() {
    boardElement.classList.remove('cross-plays')
}

function updateScoreOnBoard() {
    if (crossesScoreElement.textContent != crossesCumulativeScore) {
        crossesScoreElement.textContent = crossesCumulativeScore;
        animateElement(crossesScoreElement, 'blink', 500);
    }
    
    if (circlesScoreElement.textContent != circlesCumulativeScore) {
        circlesScoreElement.textContent = circlesCumulativeScore;
        animateElement(circlesScoreElement, 'blink', 500);
    }
}

function resetCumulativeScores() {
    crossesCumulativeScore = 0;
    circlesCumulativeScore = 0;
    updateScoreOnBoard();
}

function handleClick(e) {
    const cell = e.target;
    const currentMark = crossTurn ? crossClass : circleClass;
    const cellIsMarked = cell.classList.contains(crossClass) ||
                         cell.classList.contains(circleClass); 

    if (cellIsMarked) return;

    placeMark(cell, currentMark);

    if (currentMarkWins(currentMark)) {
        incrementScore(currentMark);
        showWinner(currentMark);
        return;
    } 
    
    if (boardIsFull(currentMark)) {
        showModal(`It's a DRAW!`);
        return;
    } 
    
    swapTurns();
    setBoardHover(crossTurn);
}

function placeMark(cell, markToAdd) {
    cell.classList.add(markToAdd);
}

function swapTurns() {
    crossTurn = !crossTurn;
}

function incrementScore(winner) {
    if ( winner === crossClass ) {
        crossesCumulativeScore++;
    } else {
        circlesCumulativeScore++;
    }
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

function showWinner(currentMark) {  
    showModal(winnerMessage(currentMark));
}

function resetGame() {
    crossTurn = true;
    startGame();
}

function showModal(message) {
    modalMessageElement.textContent = message;
    dialogElement.showModal();
}

function animateElement(element, animationClass, timeout) {
    element.classList.add(animationClass);
    setTimeout(() => element.classList.remove(animationClass), timeout);
}

