const themeToggle = document.getElementById('theme-button');
const themeStaff = document.getElementById('theme-staff');

let theme = 'light';
let rotation;

try {
    theme = localStorage.getItem('theme') || theme;
} catch (e) {
    console.error('Error reading theme from localStorage:', e);
}

document.documentElement.dataset.theme = theme;
setButtonText();

if (theme === 'light') {
    rotation = 180;
} else {
    rotation = 0;
}
themeStaff.style.rotate = `${rotation}deg`;

document.querySelector('theme-toggle').hidden = false;

function toggleTheme() {
    if (theme === 'light') {
        theme = 'dark';
    } else {
        theme = 'light';
    }

    setButtonText();

    document.documentElement.dataset.theme = theme;

    rotation += 180;
    themeStaff.style.rotate = `${rotation}deg`;

    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.error('Error writing theme to localStorage:', e);
    }
}

function setButtonText() {
    if (theme === 'light') {
        themeToggle.textContent = 'Switch to dark mode';
    } else {
        themeToggle.textContent = 'Switch to light mode';
    }
}

themeToggle.addEventListener('click', toggleTheme);