class MarioGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');

        // Game constants
        this.GRAVITY = 0.8;
        this.JUMP_FORCE = -15;
        this.PLAYER_SPEED = 6;
        this.COIN_SIZE = 20;
        this.OBSTACLE_WIDTH = 30;
        this.OBSTACLE_HEIGHT = 50;
        this.CAMERA_OFFSET = 300;

        // Game state
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.gameWon = false;
        this.cameraX = 0;

        // Player
        this.player = {
            x: 50,
            y: this.canvas.height - 50,
            width: 30,
            height: 50,
            velocityY: 0,
            velocityX: 0,
            isJumping: false,
            maxSpeed: 4,
            acceleration: 0.2,
            friction: 0.9
        };

        // Platforms
        this.platforms = [
            { x: 0, y: this.canvas.height - 20, width: 2000, height: 20 }, // Ground
            { x: 200, y: this.canvas.height - 100, width: 100, height: 20 },
            { x: 400, y: this.canvas.height - 150, width: 100, height: 20 },
            { x: 600, y: this.canvas.height - 200, width: 100, height: 20 },
            { x: 800, y: this.canvas.height - 250, width: 100, height: 20 },
            { x: 1000, y: this.canvas.height - 300, width: 100, height: 20 },
            { x: 1200, y: this.canvas.height - 200, width: 100, height: 20 },
            { x: 1400, y: this.canvas.height - 150, width: 100, height: 20 },
            { x: 1600, y: this.canvas.height - 100, width: 100, height: 20 },
            { x: 1800, y: this.canvas.height - 200, width: 100, height: 20 }
        ];

        // Coins
        this.coins = [
            { x: 250, y: this.canvas.height - 120, collected: false },
            { x: 450, y: this.canvas.height - 170, collected: false },
            { x: 650, y: this.canvas.height - 220, collected: false },
            { x: 850, y: this.canvas.height - 270, collected: false },
            { x: 1050, y: this.canvas.height - 320, collected: false },
            { x: 1250, y: this.canvas.height - 220, collected: false },
            { x: 1450, y: this.canvas.height - 170, collected: false },
            { x: 1650, y: this.canvas.height - 120, collected: false },
            { x: 1850, y: this.canvas.height - 220, collected: false }
        ];

        // Obstacles
        this.obstacles = [
            { x: 300, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 500, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 700, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 900, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 1100, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 1300, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 1500, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 1700, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT },
            { x: 1900, y: this.canvas.height - 70, width: this.OBSTACLE_WIDTH, height: this.OBSTACLE_HEIGHT }
        ];

        // Input handling
        this.keys = {
            left: false,
            right: false,
            space: false
        };

        this.initialize();
    }

    initialize() {
        // Set up event listeners
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Start game loop
        this.gameLoop();
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowLeft') this.keys.left = true;
        if (e.key === 'ArrowRight') this.keys.right = true;
        if (e.key === ' ') this.keys.space = true;
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowLeft') this.keys.left = false;
        if (e.key === 'ArrowRight') this.keys.right = false;
        if (e.key === ' ') this.keys.space = false;
    }

    checkVictory() {
        const allCoinsCollected = this.coins.every(coin => coin.collected);
        if (allCoinsCollected && !this.gameWon) {
            this.gameWon = true;
            const victoryMessage = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(0, 0, 0, 0.8);
                    padding: 20px;
                    border: 2px solid #00ff00;
                    color: #00ff00;
                    font-family: 'VT323', monospace;
                    text-align: center;
                    z-index: 1000;
                ">
                    <h2>Congratulations!</h2>
                    <p>You collected all the coins!</p>
                    <p>Final Score: ${this.score}</p>
                    <button onclick="document.location.reload()" style="
                        background-color: #00ff00;
                        color: #000;
                        border: none;
                        padding: 10px 20px;
                        font-family: 'VT323', monospace;
                        cursor: pointer;
                        margin-top: 10px;
                    ">Play Again</button>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', victoryMessage);
        }
    }

    update() {
        if (this.gameOver || this.gameWon) return;

        // Player horizontal movement with acceleration and friction
        if (this.keys.left) {
            this.player.velocityX = Math.max(this.player.velocityX - this.player.acceleration, -this.player.maxSpeed);
        } else if (this.keys.right) {
            this.player.velocityX = Math.min(this.player.velocityX + this.player.acceleration, this.player.maxSpeed);
        } else {
            this.player.velocityX *= this.player.friction;
        }

        // Apply horizontal movement
        this.player.x += this.player.velocityX;

        // Jump
        if (this.keys.space && !this.player.isJumping) {
            this.player.velocityY = this.JUMP_FORCE;
            this.player.isJumping = true;
        }

        // Apply gravity
        this.player.velocityY += this.GRAVITY;
        this.player.y += this.player.velocityY;

        // Check platform collisions
        let onPlatform = false;
        this.platforms.forEach(platform => {
            if (this.player.x < platform.x + platform.width &&
                this.player.x + this.player.width > platform.x &&
                this.player.y + this.player.height > platform.y &&
                this.player.y < platform.y + platform.height) {
                if (this.player.velocityY > 0) {
                    this.player.y = platform.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.isJumping = false;
                    onPlatform = true;
                }
            }
        });

        // Update camera position
        if (this.player.x > this.cameraX + this.CAMERA_OFFSET) {
            this.cameraX = this.player.x - this.CAMERA_OFFSET;
        }
        if (this.player.x < this.cameraX + 100) {
            this.cameraX = this.player.x - 100;
        }
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.platforms[0].width - this.canvas.width));

        // Check coin collisions
        this.coins.forEach(coin => {
            if (!coin.collected &&
                this.player.x < coin.x + this.COIN_SIZE &&
                this.player.x + this.player.width > coin.x &&
                this.player.y < coin.y + this.COIN_SIZE &&
                this.player.y + this.player.height > coin.y) {
                coin.collected = true;
                this.score += 100;
                this.scoreElement.textContent = this.score;
                this.checkVictory();
            }
        });

        // Check obstacle collisions
        this.obstacles.forEach(obstacle => {
            if (this.player.x < obstacle.x + obstacle.width &&
                this.player.x + this.player.width > obstacle.x &&
                this.player.y < obstacle.y + obstacle.height &&
                this.player.y + this.player.height > obstacle.y) {
                this.lives--;
                this.livesElement.textContent = this.lives;
                if (this.lives <= 0) {
                    this.gameOver = true;
                    alert('Game Over! Score: ' + this.score);
                    document.location.reload();
                } else {
                    // Reset player position
                    this.player.x = 50;
                    this.player.y = this.canvas.height - 50;
                    this.player.velocityY = 0;
                    this.player.velocityX = 0;
                    this.cameraX = 0;
                }
            }
        });

        // Screen boundaries
        if (this.player.x < 0) {
            this.player.x = 0;
            this.player.velocityX = 0;
        }
        if (this.player.x + this.player.width > this.platforms[0].width) {
            this.player.x = this.platforms[0].width - this.player.width;
            this.player.velocityX = 0;
        }
        if (this.player.y > this.canvas.height) {
            this.lives--;
            this.livesElement.textContent = this.lives;
            if (this.lives <= 0) {
                this.gameOver = true;
                alert('Game Over! Score: ' + this.score);
                document.location.reload();
            } else {
                this.player.x = 50;
                this.player.y = this.canvas.height - 50;
                this.player.velocityY = 0;
                this.player.velocityX = 0;
                this.cameraX = 0;
            }
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw platforms
        this.ctx.fillStyle = '#00ff00';
        this.platforms.forEach(platform => {
            this.ctx.fillRect(platform.x - this.cameraX, platform.y, platform.width, platform.height);
        });

        // Draw coins
        this.ctx.fillStyle = '#ffff00';
        this.coins.forEach(coin => {
            if (!coin.collected) {
                this.ctx.beginPath();
                this.ctx.arc(coin.x - this.cameraX + this.COIN_SIZE/2, coin.y + this.COIN_SIZE/2, this.COIN_SIZE/2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });

        // Draw obstacles
        this.ctx.fillStyle = '#ff0000';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x - this.cameraX, obstacle.y, obstacle.width, obstacle.height);
        });

        // Draw player
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(this.player.x - this.cameraX, this.player.y, this.player.width, this.player.height);

        // Draw collected coins count
        const collectedCoins = this.coins.filter(coin => coin.collected).length;
        const totalCoins = this.coins.length;
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '20px VT323';
        this.ctx.fillText(`Coins: ${collectedCoins}/${totalCoins}`, 10, 30);
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarioGame();
}); 