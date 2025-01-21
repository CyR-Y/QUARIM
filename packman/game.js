const pacman = document.getElementById('pacman');
const ghost = document.getElementById('ghost');
const foodItems = document.querySelectorAll('.food');
const walls = document.querySelectorAll('.wall'); // Get wall elements
let pacmanPosition = { x: 0, y: 0 };
let ghostPosition = { x: 200, y: 200 };
const step = 40; // Movement step size

document.addEventListener('keydown', (event) => {
    let newPosition = { ...pacmanPosition }; // Copy current position
    switch (event.key) {
        case 'ArrowUp':
            newPosition.y -= step;
            break;
        case 'ArrowDown':
            newPosition.y += step;
            break;
        case 'ArrowLeft':
            newPosition.x -= step;
            break;
        case 'ArrowRight':
            newPosition.x += step;
            break;
    }
    if (!checkWallCollision(newPosition)) {
        pacmanPosition = newPosition; // Update position if no collision
    }
    updatePacmanPosition();
    checkCollision();
});

function updatePacmanPosition() {
    pacman.style.transform = `translate(${pacmanPosition.x}px, ${pacmanPosition.y}px)`;
}

function checkWallCollision(position) {
    const pacmanRect = {
        x: position.x,
        y: position.y,
        width: 40,
        height: 40
    };
    for (let wall of walls) {
        const wallRect = wall.getBoundingClientRect();
        if (
            pacmanRect.x < wallRect.x + wallRect.width &&
            pacmanRect.x + pacmanRect.width > wallRect.x &&
            pacmanRect.y < wallRect.y + wallRect.height &&
            pacmanRect.y + pacmanRect.height > wallRect.y
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}

function checkCollision() {
    foodItems.forEach((food) => {
        const foodRect = food.getBoundingClientRect();
        const pacmanRect = pacman.getBoundingClientRect();
        if (
            pacmanRect.x < foodRect.x + foodRect.width &&
            pacmanRect.x + pacmanRect.width > foodRect.x &&
            pacmanRect.y < foodRect.y + foodRect.height &&
            pacmanRect.y + pacmanRect.height > foodRect.y
        ) {
            food.style.display = 'none'; // Remove food on collision
        }
    });

    // Check collision with ghost
    const ghostRect = ghost.getBoundingClientRect();
    if (
        pacmanRect.x < ghostRect.x + ghostRect.width &&
        pacmanRect.x + pacmanRect.width > ghostRect.x &&
        pacmanRect.y < ghostRect.y + ghostRect.height &&
        pacmanRect.y + pacmanRect.height > ghostRect.y
    ) {
        alert("Game Over! You were caught by the ghost!");
        resetGame();
    }
}

function resetGame() {
    pacmanPosition = { x: 0, y: 0 };
    ghostPosition = { x: 200, y: 200 }; // Reset ghost position
    updatePacmanPosition();
    ghost.style.transform = `translate(${ghostPosition.x}px, ${ghostPosition.y}px)`;
}

// Function to move the ghost towards Pac-Man
function moveGhost() {
    const dx = pacmanPosition.x - ghostPosition.x;
    const dy = pacmanPosition.y - ghostPosition.y;

    let newGhostPosition = { ...ghostPosition }; // Copy current ghost position

    if (Math.abs(dx) > Math.abs(dy)) {
        // Move horizontally
        if (dx > 0) {
            // Move right
            newGhostPosition.x += step;
        } else {
            // Move left
            newGhostPosition.x -= step;
        }
    } else {
        // Move vertically
        if (dy > 0) {
            // Move down
            newGhostPosition.y += step;
        } else {
            // Move up
            newGhostPosition.y -= step;
        }
    }

    // Check for wall collision after moving
    if (!checkWallCollision(newGhostPosition)) {
        ghostPosition = newGhostPosition; // Update ghost position if no collision
    }

    ghost.style.transform = `translate(${ghostPosition.x}px, ${ghostPosition.y}px)`;
}

// Move the ghost every second
setInterval(moveGhost, 1000);
