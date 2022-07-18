let turn = "X";
let gameOver = false;
let player1, player2, currentPlayerName;

let winChances = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let boxes = document.getElementsByClassName("box");

let gameBoard = ["", "", "", "", "", "", "", "", ""];

const setTurnColor = () => document.getElementsByClassName('playerTurn')[0].style.color = "#0000FF";

const takePlayerNames = () => {
    player1 = prompt("Player1 (X) name : ");
    player2 = prompt("Player2 (O) name : ");
    if(player1 === null || player1 === ""){
        player1 = "X";
    }
    if(player2 === null || player2 === ""){
        player2 = "O";
    }
    document.getElementsByClassName('playerTurn')[0].innerText = player1 + "\'s Turn";
    setTurnColor();
}

const changeTurn = () => {
    if(turn === "X"){
        turn = "O";
        currentPlayerName = player2;
    }
    else {
        turn = "X";
        currentPlayerName = player1;
    }
    return turn;
}




const checkWinner = () => {
    let boxText = document.getElementsByClassName("text");
winChances.forEach(element => {
        let firstPosition = boxText[element[0]];
        let secondPosition = boxText[element[1]];
        let thirdPosition = boxText[element[2]];
        
        if((firstPosition.innerText === secondPosition.innerText) && (thirdPosition.innerText === secondPosition.innerText) && (firstPosition.innerText !== "")){
            document.querySelector(".playerTurn").innerText = currentPlayerName + " Won";
            document.querySelector(".playerTurn").style.color = "#008000";
            gameOver = true;
            firstPosition.style.color = secondPosition.style.color = thirdPosition.style.color ="#008000";
        }
        else if(!gameBoard.includes('') && gameOver != true){
            document.querySelector(".playerTurn").innerText = "Match Drawn!";
            gameOver = true;
        }
    })

}


const changeTextColor = (turn,boxText) => {
    if(turn === "X"){
        boxText.style.color = "#0000FF";
        document.getElementsByClassName('playerTurn')[0].style.color = "#FF0000";
    }
    else if(turn === "O"){
        boxText.style.color = "#FF0000";
        document.getElementsByClassName('playerTurn')[0].style.color = "#0000FF";
    }
}


Array.from(boxes).forEach( element => {
    let boxText = element.querySelector(".text")
    element.addEventListener("click", () =>{
        if(boxText.innerText === "" && gameOver !== true){
            boxText.innerText = turn;
            const clickedBoxIndex = parseInt(boxText.getAttribute("data-cell-index"));
            gameBoard[clickedBoxIndex] = turn;
            changeTextColor(turn,boxText);
            checkWinner();
            
            if(!gameOver){
                turn = changeTurn();
                document.getElementsByClassName("playerTurn")[0].innerText = currentPlayerName + "\'s Turn";
                
            }
        }
    })
})


reset.addEventListener("click", () => {
    let boxText = document.querySelectorAll(".text");
    Array.from(boxText).forEach(element => {
        element.innerText = "";
        element.style.color = "#000000";
    });
    turn = "X";
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    document.getElementsByClassName("playerTurn")[0].innerText = player1 + "\'s Turn";
    setTurnColor();
})