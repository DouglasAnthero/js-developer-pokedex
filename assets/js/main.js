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
const hp = document.querySelector('.hp')
const barras = document.querySelectorAll('.prog');
function loadPokemonModalData(card) {
    return pokeApi.getPokemons(card, 1).then((pokemons = []) => pokemons)
        .then((pokemons) => {
            hp.textContent = pokemons[0].hp.base_stat
            attack.textContent = pokemons[0].attack.base_stat
            defense.textContent = pokemons[0].defense.base_stat
            spAttack.textContent = pokemons[0].specialAttack.base_stat
            spDefense.textContent = pokemons[0].specialDefense.base_stat
            speed.textContent = pokemons[0].speed.base_stat
            barras[0].value = pokemons[0].hp.base_stat
            barras[1].value = pokemons[0].attack.base_stat
            barras[2].value = pokemons[0].defense.base_stat
            barras[3].value = pokemons[0].specialAttack.base_stat
            barras[4].value = pokemons[0].specialDefense.base_stat
            barras[5].value = pokemons[0].speed.base_stat
            console.log(pokemons);
            return pokemons
        })
        .then((pokemons) => pokemons[0].text)
        .then((pokemonsText) => aboutText.textContent = (pokemonsText.replace("\n", " ")).replace("\f", " "))
}


const modalName = document.querySelector('.modal-name')
const h2Number = document.querySelector('.h2-number')
const imgModal = document.querySelector('.img-container img')
const containerType = document.querySelector('.container-ol')
const containerInfo = document.querySelector('.pokemon-info-container')
const attack = document.querySelector('.attack')
const defense = document.querySelector('.defense')
const spAttack = document.querySelector('.sp-attack')
const spDefense = document.querySelector('.sp-defense')
const speed = document.querySelector('.speed')

let pokemonClass = '';

function fillModal(card) {
    const number = document.querySelectorAll('.number')
    const name = document.querySelectorAll('.name')
    const photo = document.querySelectorAll('.detail img')
    const types = document.querySelectorAll('.types')
    const type = document.querySelectorAll('.pokemon')
    pokemonClass = ((type[card].classList.value).split(' '));
    containerInfo.classList.add(pokemonClass[1]);
    containerType.innerHTML = types[card].outerHTML;
    h2Number.textContent = number[card].textContent;
    modalName.textContent = name[card].textContent;
    imgModal.src = photo[card].src;
    loadPokemonModalData(card)
}

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

function createCards() {
    setTimeout(() => {
        cards = document.getElementsByClassName('pokemon')
        setTimeout(callModal(cards), 250)
    }, 250)
};

const aboutText = document.querySelector('.about-text')
const statusBar = document.querySelector('.status-stats')

about.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (aboutText.classList.contains('deactivated')) {
        aboutText.classList.remove('deactivated')
        baseStats.classList.add('deactivated')
        valueStats.classList.add('deactivated')
        statusBar.style.display = 'none'
        stats.style.borderBottom = 'none';
        about.style.borderBottom = '0.2rem solid black';
    }
})
stats.addEventListener('click', (event) => {
    //  event.stopPropagation();
    // event.preventDefault();
    if (baseStats.classList.contains('deactivated')) {
        aboutText.classList.add('deactivated')
        baseStats.classList.remove('deactivated')
        valueStats.classList.remove('deactivated')
        statusBar.style.display = 'flex'
        about.style.borderBottom = 'none';
        stats.style.borderBottom = '0.2rem solid black';
    }
})
closeBtn.addEventListener('click', (event) => {
    //   event.stopPropagation()
    // event.preventDefault()
    modal.classList.add('deactivated');
    containerType.innerHTML = '';
    containerInfo.classList.remove(pokemonClass[1]);
})


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

loadPokemonItens(offset, limit)
createCards();

//let dontReload = false
//carregarPreferencias();
//console.log(dontReload);
//
//
//function carregarPreferencias() {
//    dontReload = localStorage.getItem('Reload', JSON.parse(dontReload));
//}
//
//if (dontReload == false) {
//    dontReload = localStorage.setItem('Reload', false);
//    reloadPage();
//}
//function reloadPage() {
//    setInterval(window.location.reload(), 3000)
//}