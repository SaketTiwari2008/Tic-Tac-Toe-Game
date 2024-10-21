let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelectorAll("#reset-btn");
let newGameBtn = document.querySelectorAll("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickCount = 0;

let turnO = true; // player X, player O

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// for condition turn
function turn(box) {
  if (turnO) {
    box.innerText = "O";
    turnO = false;
  } else {
    box.innerText = "X";
    turnO = true;
  }
  box.disabled = true;
}

// for boxes click event
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    clickCount++;
    //console.log("box was clicked");
    turn(box);
    checkWinner();
  });
});

// for Show Winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// check Winner function
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if ((pos1Val != "", pos2Val != "", pos3Val != "")) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log(`Congratulation, winner was ${pos1Val}`);
        showWinner(pos1Val);
      }
      // for game draw case
      else if(pos1Val === pos2Val && pos2Val === pos3Val || clickCount == 9){
        msg.innerText = "Game Was Draw ";
        msgContainer.classList.remove("hide");
        disableBoxes();
      }
    } 
  }
};

//for new game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// for after game is win then disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// for after click newGameBtn then enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// for trogger new Game Button
// newGameBtn.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", resetGame);
