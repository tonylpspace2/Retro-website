const input = document.getElementById('input');
const output = document.getElementById('output');
const commandDisplay = document.getElementById('command');
const terminal = document.querySelector('.terminal');
const usernameSetup = document.getElementById('username-setup');
const usernameInput = document.getElementById('username-input');
const setUsernameBtn = document.getElementById('set-username');
const terminalHeader = document.getElementById('terminal-header');
const prompt = document.getElementById('prompt');

let currentUsername = 'user';

setUsernameBtn.addEventListener('click', () => {
    const newUsername = usernameInput.value.trim() || 'user';
    currentUsername = newUsername;
    updateTerminalUsername();
    usernameSetup.style.display = 'none';
    terminal.style.display = 'flex';
    input.focus();
});

usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        setUsernameBtn.click();
    }
});

function updateTerminalUsername() {
    const usernameDisplay = `${currentUsername}@terminal:~$`;
    terminalHeader.textContent = usernameDisplay;
    prompt.textContent = usernameDisplay;
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const command = input.value;
        commandDisplay.textContent = command;
        processCommand(command);
        input.value = '';
    }
});

function processCommand(command) {
    let response = '';

    switch (command.toLowerCase()) {
        case 'help':
            input.placeholder = '';
            response = '<p>Available commands:</p>' +
                      '<p>- help: Show this help message</p>' +
                      '<p>- clear: Clear the terminal</p>' +
                      '<p>- home: Go to Home page</p>' +
                      '<p>- about: Go to About page</p>' +
                      '<p>- projects: Go to Projects page</p>' +
                      '<p>- blog: Go to Blog page</p>' +
                      '<p>- contact: Go to Contact page</p>' +
                      '<p>- tetris: Play Tetris</p>' +
                      '<p>- mario: Play Platformer</p>';
            break;
        case 'about':
            window.location.href = '/Retro-website/pages/about.html';
            return;
        case 'date':
            response = `<p>${new Date().toString()}</p>`;
            break;
        case 'projects':
            window.location.href = '/Retro-website/pages/projects.html';
            return;
        case 'blog':
            window.location.href = '/Retro-website/pages/blog.html';
            return;
        case 'contact':
            window.location.href = '/Retro-website/pages/contact.html';
            return;
        case 'clear':
            output.innerHTML = '';
            commandDisplay.textContent = '';
            return;
        case 'home':
            window.location.href = '/Retro-website/pages/home.html';
            return;
        case 'tetris':
            window.location.href = '/Retro-website/pages/tetris.html';
            return;
        case 'mario':
            window.location.href = '/Retro-website/pages/mario.html';
            return;
        default:
            response = `<p>Command not found: ${command}</p>`;
    }
    output.innerHTML += response;
}