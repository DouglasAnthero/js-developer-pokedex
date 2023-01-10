const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const about = document.querySelector('.about')
const stats = document.querySelector('.stats')
const baseStats = document.querySelector('.base-stats')
const valueStats = document.querySelector('.value-stats')
const maxRecords = 151
const limit = 10
let offset = 0;
let cards = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        createCards();
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
        createCards();
    }
})


const aboutTitle = document.querySelector('.about-title')
const aboutContent = document.querySelector('.about-content')
const breeding = document.querySelector('.breeding')
const breedingContainer = document.querySelector('.breeding-container')

about.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (aboutTitle.classList.contains('deactivated')) {
        aboutTitle.classList.remove('deactivated')
        aboutContent.classList.remove('deactivated')
        breeding.classList.remove('deactivated')
        breedingContainer.classList.remove('deactivated')
        baseStats.classList.add('deactivated')
        valueStats.classList.add('deactivated')
        stats.style.borderBottom = 'none';
        about.style.borderBottom = '0.2rem solid black';
    }
})


stats.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (baseStats.classList.contains('deactivated')) {
        aboutTitle.classList.add('deactivated')
        aboutContent.classList.add('deactivated')
        breeding.classList.add('deactivated')
        breedingContainer.classList.add('deactivated')
        baseStats.classList.remove('deactivated')
        valueStats.classList.remove('deactivated')
        about.style.borderBottom = 'none';
        stats.style.borderBottom = '0.2rem solid black';
    }
})

function createCards() {
    setTimeout(() => {
        cards = document.getElementsByClassName('pokemon')
        for (const card of cards) {
            card.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                console.log(card);
            })
        }
        console.log(cards.length);
    }, 250)
};

createCards();