class KeyboardShortcuts {
    constructor() {
        this.initialize();
    }

    initialize() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        // Check for Ctrl + H (or Cmd + H on Mac)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
            e.preventDefault(); // Prevent default browser behavior
            window.location.href = '/Retro-website/index.html';
        }
    }
}

// Initialize keyboard shortcuts when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KeyboardShortcuts();
}); 