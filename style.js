const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 30;
const cols = 15;
const rows = 15;
canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,2,1,0,1,0,1,1,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,1,1],
    [1,0,0,0,1,0,1,1,1,1,1,0,0,0,1],
    [1,1,1,0,0,0,1,0,0,0,0,0,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let player = { x: 1, y: 1 };

function drawMaze() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = "#ffccdd"; // Soft pink walls
            } else if (maze[row][col] === 2) {
                ctx.fillStyle = "#ffff99"; // Goal (light yellow)
            } else {
                ctx.fillStyle = "#fff8f0"; // Path (light cream)
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            ctx.strokeStyle = "#d97c91"; // Grid outline
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(
        player.x * tileSize + tileSize / 2,
        player.y * tileSize + tileSize / 2,
        tileSize / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    
    if (maze[newY] && maze[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
        checkWin();
    }

    drawGame();
}

function checkWin() {
    if (maze[player.y][player.x] === 2) {
        document.getElementById("message").innerText = "Congratulations Baby! 🎉 You won!";
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": movePlayer(0, -1); break;
        case "ArrowDown": movePlayer(0, 1); break;
        case "ArrowLeft": movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1, 0); break;
    }
});

document.getElementById("up").addEventListener("click", () => movePlayer(0, -1));
document.getElementById("down").addEventListener("click", () => movePlayer(0, 1));
document.getElementById("left").addEventListener("click", () => movePlayer(-1, 0));
document.getElementById("right").addEventListener("click", () => movePlayer(1, 0));

drawGame();
