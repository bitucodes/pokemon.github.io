const pokedex = document.getElementById('pokedex');
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const fetchPokemon = (searchTerm) => {
    const promises = [];
    for (let i = 1; i <= 10; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        let filteredResults = results;

        if (searchTerm) {
            // If a search term is provided, filter the results based on the name
            filteredResults = results.filter((result) =>
                result.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const pokemon = filteredResults.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

searchBtn.addEventListener("click", () => {
    fetchPokemon(searchBox.value);
});
