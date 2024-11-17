const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a Pokémon name or ID!');
        return;
    }
    fetchPokemon(query);
});

const fetchPokemon = async (query) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) throw new Error('Not Found');
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert('Pokémon not found');
    }
};

const updateUI = (data) => {
    // Update name and ID
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;

    // Update weight and height
    document.getElementById('weight').textContent = data.weight;
    document.getElementById('height').textContent = data.height;

    // Update types
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = ''; // Clear previous types
    data.types.forEach(type => {
        const typeElement = document.createElement('p');
        typeElement.textContent = type.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
    });

    // Update stats
    const stats = data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});
    document.getElementById('hp').textContent = stats.hp;
    document.getElementById('attack').textContent = stats.attack;
    document.getElementById('defense').textContent = stats.defense;
    document.getElementById('special-attack').textContent = stats['special-attack'];
    document.getElementById('special-defense').textContent = stats['special-defense'];
    document.getElementById('speed').textContent = stats.speed;

    // Update sprite
    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = ''; // Clear previous sprite
    const sprite = document.createElement('img');
    sprite.id = 'sprite'; // Add the correct id for tests
    sprite.src = data.sprites.front_default;
    sprite.alt = `${data.name} sprite`;
    spriteContainer.appendChild(sprite);
};