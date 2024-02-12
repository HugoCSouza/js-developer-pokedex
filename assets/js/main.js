const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const divPrincipal = document.getElementById('alwayson')
const detailsPokemonHtml = document.createElement("div")
var childrensDivPrincipal = divPrincipal.childElementCount

// console.log(detailsButtons)

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <button class="buttonDetails" type="button" onclick="getDetails('${pokemon.number}')"></button>
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

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

detailsPokemonHtml.id = 'allDetails'

function getDetails(numberPokemon){
    pokeApi.getPokemons(numberPokemon-1,0).then((pokemon) =>{
        if(childrensDivPrincipal === 2){
            divPrincipal.removeChild(detailsPokemonHtml)
            detailsPokemonHtml.innerHTML = ''
        }
        pokemon = pokemon[0]
        detailsPokemonHtml.innerHTML += convertPokemonToDetailsHtml(pokemon)
        divPrincipal.appendChild(detailsPokemonHtml)
        childrensDivPrincipal = divPrincipal.childElementCount
        console.log(childrensDivPrincipal == 2)
    });
};

function convertPokemonToDetailsHtml(pokemon){
    return `
    <div class = "alldetails ${pokemon.type}">
        <h1> ${pokemon.name} </h1>
        <div id = "numberDetails" >Number: #${pokemon.number}</div> 
        <div id = "typesDetails" class="${pokemon.type}">
        <h2>Types:</h2> 
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        </div>
        <div id = "photoComplete">      
        <img src="${pokemon.photoComplete}"
                     alt="${pokemon.name}">
        </div>
        <div class = "allMoves">Moves: 
        <ol class="moves">
            ${pokemon.moves.map((move) => `<li class="type ${move}">${move}</li>`).join('')}
        </ol>
        </div>

        
    </div>
`
};

    