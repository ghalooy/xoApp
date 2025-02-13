const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const placeSound = new Audio("buttonclick.mp3");  // For placing a flower
const winSound = new Audio("music.mp3");        // For winning
const winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8], 
[0, 3, 6], 
[1, 4, 7], 
[2, 5, 8], 
[0, 4, 8],
[2, 4, 6], 
]; 
let options = ["", "","","","","","","",""]; 
let currentPlayer = "Iris"; 
let running = false; 
initializeGame();

function initializeGame(){
cells.forEach(cell => cell.addEventListener("click", cellClicked)); 
restartButton.addEventListener("click", restartGame); 
statusText.textContent = `${currentPlayer}'s turn`; 
running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); 
    if(options[cellIndex]  != "" || !running){
        return; 

    }
    updateCell(this, cellIndex);
    checkWinner(); 

}
function updateCell(cell, index) {
    options[index] = currentPlayer;

    if (currentPlayer === "Iris") {
        cell.innerHTML = '<img src="Iris.png" alt="Iris" class="flower-icon">';
    } else {
        cell.innerHTML = '<img src="lily.png" alt="Lily" class="flower-icon">';
    }

    placeSound.play(); // 🔊 Play sound when placing a flower
}
function changePlayer(){
currentPlayer = (currentPlayer == "Iris") ? "Lily" : "Iris"; 
statusText.textContent = `${currentPlayer}'s turn`; 
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        winSound.play();
        running = false; // Stops the game so no more moves can be played

        // 🌸 Only show the letter if IRIS wins
        if (currentPlayer === "Iris") {
            setTimeout(() => {
                document.querySelector("#gameContainer").style.opacity = "0"; // Slowly fade out
            }, 500);

            setTimeout(() => {
                document.querySelector("#gameContainer").style.display = "none";
                
                // 🌸 Now fade in the letter smoothly
                const letter = document.querySelector("#letterContainer");
                letter.style.display = "block";
                setTimeout(() => {
                    letter.style.opacity = "1";
                }, 100);
            }, 4000); // Game fades out for 2 seconds, then the letter appears
        }
    } 
    else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } 
    else {
        changePlayer(); // Normal game continues
    }
}
function restartGame(){
    currentPlayer = "Iris"; 
    options = ["", "","","","","","","",""]; 
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerHTML = ""); // Fix: Clears images too!
    running = true; 
    document.querySelector("#gameContainer").style.display = "block"; // Ensure game appears
    document.querySelector("#gameContainer").style.opacity = "1"; // Reset opacity
    document.querySelector("#letterContainer").style.display = "none"; // Hide letter after restart
}


document.querySelector("#openLetterButton").addEventListener("click", () => {
    let closedLetter = document.querySelector("#closedLetter");
    let openLetter = document.querySelector("#openLetter");
    let openLetterButton = document.querySelector("#openLetterButton");
    let letterText = document.querySelector("#letterText");

    // Hide the closed letter & button
    closedLetter.style.display = "none";
    openLetterButton.style.display = "none";

    // Force animation to restart (fixes caching issue)
    openLetter.src = "open-letter.gif?random=" + new Date().getTime();
    openLetter.style.display = "block";

    // After animation is done, show the text
    setTimeout(() => {
        openLetter.style.display = "none"; // Hide animation
        openLetter.src = "opened.png"; // Show opened letter image
        openLetter.style.display = "block"; 
        letterText.style.display = "block"; 
    }, 2000); // Adjust time to match the GIF animation duration
});
function typeWriterEffect(text, elementId, speed) {
    let i = 0;
    let textElement = document.getElementById(elementId);
    textElement.innerHTML = ""; // Clear existing text

    function type() {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
document.querySelector("#openLetterButton").addEventListener("click", () => {
    let closedLetter = document.querySelector("#closedLetter");
    let openLetter = document.querySelector("#openLetter");
    let letterText = document.querySelector("#letterText");

    // Hide closed letter & button
    closedLetter.style.display = "none";
    document.querySelector("#openLetterButton").style.display = "none";

    // Restart animation (fixes caching issue)
    openLetter.src = "open-letter.gif?random=" + new Date().getTime();
    openLetter.style.display = "block";

    // ⏳ Wait for the letter animation to fully finish before showing text
    setTimeout(() => {
        openLetter.src = "opened.png"; // Switch to final opened letter
        letterText.style.display = "block";

        // 🎀 Start typewriter effect now
        typeWriterEffect("Even though you don’t quite believe in Valentine’s Day, this time you’ll have to stick with me. I coded this whole site just for you—it’s my first attempt at something like this, forgive me if it sucks. It’s just a little something to show you how much I love & appreciate you ♡", "letterText", 50);
    }, 2000); // Adjust based on animation duration
    
});