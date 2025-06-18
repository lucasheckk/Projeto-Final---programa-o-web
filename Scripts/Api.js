const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = (value) => {
    return fetch(`https://rickandmortyapi.com/api/character/${value}`)
        .then(res => res.json());
};

function traduzirStatus(status) {
    switch (status) {
        case 'Alive': return 'Vivo';
        case 'Dead': return 'Morto';
        case 'unknown': return 'Desconhecido';
        default: return status;
    }
}

function traduzirEspecie(species) {
    const mapa = {
        'Human': 'Humano',
        'Alien': 'Alienígena',
        'Robot': 'Robô',
        'Humanoid': 'Humanoide',
        'unknown': 'Desconhecido'
    };
    return mapa[species] || species;
}

function traduzirGenero(gender) {
    switch (gender) {
        case 'Male': return 'Masculino';
        case 'Female': return 'Feminino';
        case 'Genderless': return 'Sem gênero';
        case 'unknown': return 'Desconhecido';
        default: return gender;
    }
}


const cachePlanetas = {};

async function traduzirTexto(texto) {
    if (!texto || texto.toLowerCase() === 'unknown') return 'Desconhecido';

    if (cachePlanetas[texto]) {
        return cachePlanetas[texto];
    }

    try {
        const resposta = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: texto,
                source: 'en',
                target: 'pt',
                format: 'text'
            })
        });

        const dados = await resposta.json();
        const traducao = dados.translatedText;
        cachePlanetas[texto] = traducao;
        return traducao;
    } catch (erro) {
        console.error('Erro ao traduzir planeta:', erro);
        return texto;
    }
}

const keys = ['name', 'status', 'species', 'gender', 'origin'];
const newKeys = {
    name: 'Nome',
    status: 'Status',
    species: 'Espécie',
    gender: 'Gênero',
    origin: 'Planeta de origem'
};

const buildResult = async (result) => {
    for (let key of keys) {
        const checkbox = document.getElementById(key);
        if (!checkbox || !checkbox.checked) continue;

        const paragrafo = document.createElement('p');

        if (key === 'origin') {
            paragrafo.innerHTML = `${newKeys[key]}: ${result.origin.name}`;
        } else {
            let valorOriginal = result[key];

            if (key === 'status') valorOriginal = traduzirStatus(valorOriginal);
            if (key === 'species') valorOriginal = traduzirEspecie(valorOriginal);
            if (key === 'gender') valorOriginal = traduzirGenero(valorOriginal);

            paragrafo.innerHTML = `${newKeys[key]}: ${valorOriginal}`;
        }

        content.appendChild(paragrafo);
    }
};


btnGo.addEventListener('click', async (event) => {
    event.preventDefault();

    if (characterId.value === '') {
        return content.innerHTML = 'É necessário escolher um ID.';
    }

    const result = await fetchApi(characterId.value);

    content.innerHTML = '';
    conteinerResult.classList.remove('hidden');
    image.src = `${result.image}`;

    await buildResult(result);
    const btnFavoritar = document.querySelector('#fav .favoritar');
    configurarBotaoFavoritar(btnFavoritar, result);
});

btnReset.addEventListener('click', () => location.reload());

document.getElementById("btn-all").addEventListener("click", function (event) {
    event.preventDefault();
    const filtros = ["name", "status", "species", "gender", "origin"];
    filtros.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = true;
    });
});

document.getElementById("btn-aleatorio").addEventListener("click", function (event) {
    event.preventDefault();
    const randomId = Math.floor(Math.random() * 826) + 1;
    document.getElementById("characterId").value = randomId;
});