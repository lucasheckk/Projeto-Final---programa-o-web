const toggleSwitch = document.getElementById('toggleSwitch');
const body = document.body;

toggleSwitch.addEventListener('click', () => {
    const isLight = body.classList.toggle('light');
    if (isLight) {
        body.classList.remove('dark');
        toggleSwitch.classList.add('active');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        toggleSwitch.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    }
});

// Ao carregar a página, aplica o tema salvo
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    body.classList.add('light');
    body.classList.remove('dark');
    toggleSwitch.classList.add('active');
} else {
    body.classList.add('dark');
    body.classList.remove('light');
    toggleSwitch.classList.remove('active');
}
