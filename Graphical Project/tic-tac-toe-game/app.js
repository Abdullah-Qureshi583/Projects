"use strict";
let boxes = document.querySelectorAll(".boxes");
let resetBtn = document.querySelector(".reset-btn");
let startBtn = document.querySelector(".start-btn");
let mainContainer = document.querySelector(".main-container");
let winnerContent = document.querySelector(".winner-container");
let msg = document.querySelector("#msg");
let scoreX = document.querySelector(".X");
let scoreO = document.querySelector(".O");
let scoreReset = document.querySelector("#score-reset");
let resetCover = document.querySelector(".cover");
let rule = document.querySelector(".rule");
let turnOAudio = new Audio("audios/click-X.mp3");
let turnXAudio = new Audio("audios/click-Y.mp3");
let startAudio = new Audio("audios/start-audio.mp3");
let resetAudio = new Audio("audios/reset-audio.mp3");
let winnerAudio = new Audio("audios/winner-audio.mp3");
winnerAudio.play();
let countX = 0;
let countO = 0;
let turn = "O";
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
// loop on every box and onclick change the inner value
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn == "O") {
            box.innerHTML = turn;
            box.style.color = "#d5def2";
            turn = "X";
            turnOAudio.play();
        }
        else {
            box.innerHTML = turn;
            box.style.color = "rgb(77, 36, 49)";
            turn = "O";
            turnXAudio.play();
        }
        box.disabled = true;
        checkWinner();
    });
});
// Check the conditions whether the user win or not
let checkWinner = () => {
    for (let pattern of winPatterns) {
        let box1Val = boxes[pattern[0]].innerHTML;
        let box2Val = boxes[pattern[1]].innerHTML;
        let box3Val = boxes[pattern[2]].innerHTML;
        if (box1Val !== "" || box2Val !== "" || box3Val !== "") {
            if (box1Val === box2Val && box2Val === box3Val) {
                showWinner(box1Val);
                disableBoxes();
            }
        }
    }
};
let showWinner = (winner) => {
    msg.innerHTML = `Winner is ${winner}`;
    winnerContent.classList.remove("remove-winner-animation");
    winnerContent.classList.add("winner-animation");
    msg === null || msg === void 0 ? void 0 : msg.classList.remove("hide");
    resetCover === null || resetCover === void 0 ? void 0 : resetCover.classList.remove("hide");
    disableBoxes();
    updateScore(winner);
    winnerAudio.play();
};
// to disable all the boxes so no more turns can happen
let disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};
//to enable all the boxes so can be play again
let enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerHTML = "";
        turn = "O";
    });
};
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", () => {
    enableBoxes();
    boxes.innerHTML = "";
    resetAudio.play();
});
startBtn === null || startBtn === void 0 ? void 0 : startBtn.addEventListener("click", () => {
    winnerContent.classList.remove("winner-animation");
    winnerContent.classList.add("remove-winner-animation");
    enableBoxes();
    rule === null || rule === void 0 ? void 0 : rule.classList.add("hide");
    resetCover === null || resetCover === void 0 ? void 0 : resetCover.classList.add("hide");
    startAudio.play();
});
let updateScore = (value) => {
    if (value == "X") {
        countX++;
        scoreX.innerHTML = countX;
    }
    else {
        countO++;
        scoreO.innerHTML = countO;
    }
};
scoreReset.addEventListener("click", () => {
    countX = 0;
    countO = 0;
    scoreX.innerHTML = "0";
    scoreO.innerHTML = "0";
    msg === null || msg === void 0 ? void 0 : msg.classList.add("hide");
    rule === null || rule === void 0 ? void 0 : rule.classList.remove("hide");
    resetAudio.play();
});
disableBoxes();
msg === null || msg === void 0 ? void 0 : msg.classList.add("hide");
winnerAudio.play();
