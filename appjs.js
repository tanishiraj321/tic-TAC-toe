let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerO starts first
let gameActive = true; // Added to track game state

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];

// Reset game function
const resetGame = () => {
    turnO = true;
    gameActive = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Box click handler
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.innerText !== "") return;
        
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;
        
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) { 
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) { 
        box.disabled = false;  // Fixed this line (was true)
        box.innerText = "";
        box.classList.remove("winning-box"); // Optional: remove winning highlight
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameActive = false;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            
            // Optional: Highlight winning boxes
            boxes[pattern[0]].classList.add("winning-box");
            boxes[pattern[1]].classList.add("winning-box");
            boxes[pattern[2]].classList.add("winning-box");
            
            return;
        }
    }
    
    // Check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "Game Ended in a Draw!";
        msgContainer.classList.remove("hide");
        gameActive = false;
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
