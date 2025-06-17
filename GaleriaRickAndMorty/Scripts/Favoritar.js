function configurarBotaoFavoritar(btn, character, redirecionar = false) {
    const path = btn.querySelector('svg path');
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const estaSalvo = favoritos.some(fav => fav.id === character.id);

    if (estaSalvo) {
        btn.classList.add('salvo');
        path.style.fill = 'red';
        path.style.stroke = 'red';
    }

    btn.addEventListener('click', () => {
        favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const index = favoritos.findIndex(fav => fav.id === character.id);

        if (index === -1) {
            favoritos.unshift(character);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            btn.classList.add('salvo');
            path.style.fill = 'red';
            path.style.stroke = 'red';
            if (redirecionar) {
                setTimeout(() => {
                    window.location.href = '../@Fav/MeusFavoritos.html';
                }, 700);
            }
        } else {
            favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            btn.classList.remove('salvo');
            path.style.fill = 'transparent';
            path.style.stroke = 'black';
        }
    });

    btn.addEventListener('mouseenter', () => {
        if (btn.classList.contains('salvo')) {
            path.style.fill = 'transparent';
            path.style.stroke = 'gray';
        }
    });

    btn.addEventListener('mouseleave', () => {
        if (btn.classList.contains('salvo')) {
            path.style.fill = 'red';
            path.style.stroke = 'red';
        }
    });
}
