const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [6,7,8],
    [3,4,5],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();

// create a function to initialize the game;
function initGame(){
    currentPlayer = "X";
    gameGrid= ["","","","","","","","",""];
    newGameBtn.classList.remove('active');
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // Initialize boxes with initial CSS
        box.classList = `box box${index+1}`;
    });

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGameBtn.classList.remove("active");
}

function checkGameOver() {
    console.log("geafa");
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] != "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else {
                answer = "O";
            }

            // disable Pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });
            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    // when game is tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    // board is filled
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box,index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener('click',initGame);
