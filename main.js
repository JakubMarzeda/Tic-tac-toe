const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll(".cell")
const board = document.querySelector("#board")
const winningTextELement = document.querySelector("#data-winning-text")
const winningMessageElement = document.querySelector("#winning-message")
const restartButton = document.querySelector("#restartButton")
let circleTurn

startGame()
function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHoverClass()
}

restartButton.addEventListener("click", handleRestartGame)

function handleRestartGame(){
    window.location.reload()
}

function handleClick(e){
    // placeMark
    const cell = e.target
    const currentCLass = circleTurn ?  CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentCLass)
    // Check For Win
    if(checkWin(currentCLass)){
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}


function endGame(draw){
    if(draw){
        winningTextELement.innerText = "Draw!"
    }else{
        winningTextELement.innerText = `${circleTurn ? "O's" :  "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentCLass){
    cell.classList.add(currentCLass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentCLass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentCLass)
        })
    })
}