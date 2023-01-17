
const pokeApi = {}
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.hp = pokeDetail.stats[0]
    pokemon.attack = pokeDetail.stats[1]
    pokemon.defense = pokeDetail.stats[2]
    pokemon.specialAttack = pokeDetail.stats[3]
    pokemon.specialDefense = pokeDetail.stats[4]
    pokemon.speed = pokeDetail.stats[5]
    pokemon.text = getPokemonModalInfo(pokemon.number);
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function getPokemonModalInfo(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonDetails) => jsonDetails.flavor_text_entries)
        .then((jsonDetails) => jsonDetails.find(jsonDetails => jsonDetails.language.name === 'en'))
        .then((jsonDetails) => jsonDetails.flavor_text)

}

