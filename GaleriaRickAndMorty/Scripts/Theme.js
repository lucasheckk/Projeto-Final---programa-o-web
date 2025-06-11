const toggleSwitch = document.getElementById('toggleSwitch');
const body = document.body;

toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('active');
    
    const isLight = body.classList.toggle('light');
    if (isLight) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    body.classList.add('light');
    body.classList.remove('dark');
    toggleSwitch.classList.add('active'); 
} else if (savedTheme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    toggleSwitch.classList.remove('active');
} else {
    body.classList.add('dark');
    body.classList.remove('light');
    toggleSwitch.classList.remove('active');
}