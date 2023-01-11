const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const about = document.querySelector('.about')
const stats = document.querySelector('.stats')
const baseStats = document.querySelector('.base-stats')
const valueStats = document.querySelector('.value-stats')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal')
const maxRecords = 151
const limit = 50
let offset = 0;
let cards = [];

function convertPokemonToLi(pokemon) {
    return `
         <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
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


const aboutText = document.querySelector('.about-text')

about.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (aboutText.classList.contains('deactivated')) {
        aboutText.classList.remove('deactivated')
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
        aboutText.classList.add('deactivated')
        baseStats.classList.remove('deactivated')
        valueStats.classList.remove('deactivated')
        about.style.borderBottom = 'none';
        stats.style.borderBottom = '0.2rem solid black';
    }
})

function createCards() {
    setTimeout(() => {
        cards = document.getElementsByClassName('pokemon')
        callModal(cards)
    }, 250)
};

function callModal(cards) {
    for (i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            modal.classList.remove('deactivated');
            fillModal(parseInt(event.currentTarget.id - 1))
        });
    }
}
closeBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    event.preventDefault()
    modal.classList.add('deactivated');
    containerType.innerHTML = '';
    containerInfo.classList.remove(pokemonClass[1]);
})


const modalName = document.querySelector('.modal-name')
const h2Number = document.querySelector('.h2-number')
const imgModal = document.querySelector('.img-container img')
const containerType = document.querySelector('.container-ol')
const containerInfo = document.querySelector('.pokemon-info-container')
let pokemonClass = '';
function fillModal(card) {
    const number = document.querySelectorAll('.number')
    const name = document.querySelectorAll('.name')
    const photo = document.querySelectorAll('.detail img')
    const types = document.querySelectorAll('.types')
    const type = document.querySelectorAll('.pokemon')
    pokemonClass = ((type[card].classList.value).split(' '));
    console.log(pokemonClass[1]);
    containerInfo.classList.add(pokemonClass[1]);
    containerType.innerHTML = types[card].outerHTML;
    h2Number.textContent = number[card].textContent;
    modalName.textContent = name[card].textContent;
    imgModal.src = photo[card].src;

}

createCards();
//callModal(cards);