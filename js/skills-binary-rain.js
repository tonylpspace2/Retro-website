class SkillsBinaryRain {
    constructor() {
        this.binaryRain = document.getElementById('binaryRain');
        this.chars = '01';
        this.columns = Math.floor(window.innerWidth / 10);
        this.drops = [];
        this.initialize();
    }

    initialize() {
        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Start animation
        this.startAnimation();
    }

    handleResize() {
        this.columns = Math.floor(window.innerWidth / 10);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    draw() {
        let output = '';
        for (let i = 0; i < this.drops.length; i++) {
            for (let j = 0; j < 3; j++) {
                output += this.chars[Math.floor(Math.random() * this.chars.length)];
            }
            output += ' ';
            this.drops[i]++;
            
            if (this.drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
        }
        this.binaryRain.innerHTML = output;
    }

    startAnimation() {
        setInterval(() => this.draw(), 50);
    }
}

// Initialize the binary rain effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsBinaryRain();
}); 