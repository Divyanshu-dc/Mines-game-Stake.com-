
var landingPage = document.getElementById("landingPage");
var gamePage = document.getElementById("gamePage");
var startGameButton = document.getElementById("startGameButton");
var endGameButton = document.getElementById("endGameButton");
var stakeAmountInput = document.getElementById("stakeAmount");
var mineCountInput = document.getElementById("mineCount");
var gameMessage = document.getElementById("gameMessage");
var board = document.querySelector(".board");


var stakeAmount = 0;
var isGameActive = false;
var gems = [];
var tiles = [];
var gemMultiplier = 2;
var mineCount = 0;

// Event listener for starting the game
startGameButton.addEventListener("click", function() {
    stakeAmount = parseInt(stakeAmountInput.value);
    mineCount = parseInt(mineCountInput.value);
    if (stakeAmount > 0 && mineCount > 0 && mineCount < 25) {
        startGame();
    } else {
        alert("Please enter a valid stake amount and mine count.");
    }
});

// Event listener for end the game
endGameButton.addEventListener("click", function() {
    endGame();
});

// func to Start the game
function startGame() {
    landingPage.style.display = "none";
    gamePage.style.display = "block";
    isGameActive = true;
    gameMessage.innerHTML = "Game started! Click on the tiles.";
    generateBoard();
    placeGemsAndMines();
}

// End the game and reset the state
function endGame() {
    endGameButton.innerHTML = "Cash Out"
    landingPage.style.display = "block";
    gamePage.style.display = "none";
    isGameActive = false;
    board.innerHTML = "";
    gameMessage.innerHTML = "";
    stakeAmount = 0;
    stakeAmountInput.value = "";
    mineCountInput.value = "";
    tiles = []; // Clear the tiles array
}

// Generate the game board
function generateBoard() {
    board.innerHTML = ""; // Clear previous board
    tiles = []; // Reset tiles array
    for (var i = 0; i < 25; i++) {
        var tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("data-index", i);
        tile.addEventListener("click", function() {
            if (isGameActive) {
                revealTile(this);
            }
        });
        board.appendChild(tile);
        tiles.push(tile);
    }
}

// mines aur gems ko board pr set krna 
function placeGemsAndMines() {
    var allIndices = Array.from(Array(25).keys());
    gems = [];

    while (gems.length < mineCount) {
        var randomIndex = Math.floor(Math.random() * allIndices.length);
        var mineIndex = allIndices.splice(randomIndex, 1)[0];
        gems.push(mineIndex);
    }
}

// Reveal a tile
function revealTile(tile) {
    if (!isGameActive) return;

    tile.classList.add("revealed"); // Add the revealed class for transition
    var index = parseInt(tile.getAttribute("data-index"));
    if (gems.includes(index)) {
        tile.classList.add("mine");
        gameMessage.innerHTML = `You hit a mine! You lose! Final stake: $0`;
        isGameActive = false;
        revealAllTiles();
        endGameButton.innerHTML= "Re-directing to landing page";
        setTimeout(endGame, 3000); // Redirect to landing page after 3 seconds
    } else {
        tile.classList.add("gem");
        stakeAmount *= gemMultiplier;
        gameMessage.innerHTML = `You found a gem! Current stake: $${stakeAmount}`;
    }
}

// Show all tiles when the game is over (ek baari mai saari )
function revealAllTiles() {
    tiles.forEach((tile, index) => {
        tile.classList.add("revealed"); // Add the revealed class for transition
        if (gems.includes(index)) {
            tile.classList.add("mine");
        } else {
            tile.classList.add("gem");
        }
    });
}
