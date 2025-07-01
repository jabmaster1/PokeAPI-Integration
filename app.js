async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const pokemonFetched = await response.json();
    return pokemonFetched;    
}

document.addEventListener('DOMContentLoaded', () => {
    const pokemonOnIndex = document.getElementById('pokemon-output');
    const pokemonInput = document.getElementById('pokemon-input');
    const searchButton = document.querySelector('button');

    async function showPokemon(pokemonName) {
        try {
            const pokemonData = await fetchPokemonData(pokemonName);
            pokemonOnIndex.innerHTML = `
                <div class="text-center">
                    <h1>${pokemonData.name}</h1>
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <h2>Type: ${pokemonData.types[0].type.name}</h2>
                </div>
            `;
        } catch (error) {
            pokemonOnIndex.innerHTML = `<h5 class="text-light text-center">Pokemon not found.</h5>`;
        }
    }

    showPokemon('Bulbasaur');

    searchButton.addEventListener('click', () => {
        const name = pokemonInput.value.trim();
        if (name) {
            showPokemon(name);
        }
    });
});