class ProjectsBinaryRain {
    constructor() {
        this.binaryRain = document.getElementById('binaryRain');
        this.columns = Math.floor(window.innerWidth / 20);
        this.drops = [];
        this.initialize();
    }

    initialize() {
        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Start animation
        this.startAnimation();
    }

    handleResize() {
        this.columns = Math.floor(window.innerWidth / 20);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }

    draw() {
        let binaryText = '';
        for (let i = 0; i < this.drops.length; i++) {
            const char = Math.random() > 0.5 ? '1' : '0';
            binaryText += `<span style="left: ${i * 20}px; top: ${this.drops[i] * 20}px;">${char}</span>`;
            if (this.drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        this.binaryRain.innerHTML = binaryText;
    }

    startAnimation() {
        setInterval(() => this.draw(), 50);
    }
}

// Initialize the binary rain effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsBinaryRain();
}); 