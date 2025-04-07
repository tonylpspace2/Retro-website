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

    switch (command) {
        case 'help':
            output.innerHTML += `
                <p>Available commands:</p>
                <ul>
                    <li>help - Show this help message</li>
                    <li>home - Go to Home page</li>
                    <li>about - Go to About page</li>
                    <li>projects - Go to Projects page</li>
                    <li>contact - Go to Contact page</li>
                    <li>blog - Go to Blog page</li>
                    <li>clear - Clear the terminal</li>
                </ul>
            `;
            break;
        case 'home':
            window.location.href = 'pages/home.html';
            break;
        case 'about':
            window.location.href = 'pages/about.html';
            break;
        case 'projects':
            window.location.href = 'pages/projects.html';
            break;
        case 'contact':
            window.location.href = 'pages/contact.html';
            break;
        case 'blog':
            window.location.href = 'pages/blog.html';
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        default:
            output.innerHTML += `<p>Command not found. Type 'help' for available commands.</p>`;
    }
}