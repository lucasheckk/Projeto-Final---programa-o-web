document.querySelectorAll('.favoritar').forEach(button => {
  button.addEventListener('click', function () {
    this.classList.toggle('ativo');
  });
});

const container = document.getElementById('content'); 

async function fetchCharacters() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data = await res.json();
  return data.results;
}

function createCard(character) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = character.id;

  card.innerHTML = `
    <img src="${character.image}" alt="${character.name}" />
    <h3>${character.name}</h3>
    <p>Status: ${character.status}</p>
    <button class="favoritar" aria-label="Favoritar">
      <svg width="24" height="24" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="favoritos">
        <path d="M15.6001 3.91998C14.268 3.92397 12.9849 4.42297 12 5.32001C11.2277 4.61746 10.2676 4.15485 9.23679 3.98858C8.20602 3.82231 7.1491 3.95955 6.19498 4.3836C5.24087 4.80765 4.43081 5.50018 3.8635 6.37671C3.29619 7.25324 2.99614 8.27591 3.00004 9.32C3.00004 15.77 12 20.14 12 20.14C12 20.14 21 15.77 21 9.32C21 7.88784 20.4311 6.51434 19.4184 5.50165C18.4057 4.48895 17.0322 3.91998 15.6001 3.91998Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  `;

  // Verifica se já está nos favoritos para marcar o botão
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (favoritos.some(fav => fav.id === character.id)) {
    card.querySelector('.favoritar').classList.add('salvo');
    card.querySelector('svg path').style.fill = 'red';
    card.querySelector('svg path').style.stroke = 'red';
  }

  const btn = card.querySelector('.favoritar');
  btn.addEventListener('click', () => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const index = favoritos.findIndex(fav => fav.id === character.id);

    if (index === -1) {
      // Adiciona
      favoritos.push(character);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));

      btn.classList.add('salvo', 'animar');
      btn.querySelector('svg path').style.fill = 'red';
      btn.querySelector('svg path').style.stroke = 'red';

      setTimeout(() => btn.classList.remove('animar'), 500);

      // Vai para a página favoritos após a animação
      setTimeout(() => {
        window.location.href = 'MeusFavoritos.html';
      }, 700);

    } else {
      // Remove
      favoritos.splice(index, 1);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));

      btn.classList.remove('salvo');
      btn.querySelector('svg path').style.fill = 'transparent';
      btn.querySelector('svg path').style.stroke = 'black';
    }
  });

  btn.addEventListener('mouseenter', () => {
    if (btn.classList.contains('salvo')) {
      btn.querySelector('svg path').style.fill = 'transparent';
      btn.querySelector('svg path').style.stroke = 'gray';
    }
  });
  btn.addEventListener('mouseleave', () => {
    if (btn.classList.contains('salvo')) {
      btn.querySelector('svg path').style.fill = 'red';
      btn.querySelector('svg path').style.stroke = 'red';
    }
  });

  return card;
}

async function init() {
  const characters = await fetchCharacters();
  characters.forEach(character => {
    container.appendChild(createCard(character));
  });
}

init();
