import './style.css';

const listEl = document.getElementById('pokemon-list');
const detailEl = document.getElementById('pokemon-detail');

function showLoading() {
  listEl.innerHTML = '<li>Загрузка...</li>';
}

async function fetchPokemons() {
  showLoading();
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    if (!response.ok) throw new Error('Ошибка сети');
    const data = await response.json();
    displayPokemons(data.results);
  } catch (error) {
    listEl.innerHTML = `<li style="color:red">${error.message}</li>`;
  }
}

function displayPokemons(pokemons) {
  listEl.innerHTML = '';
  pokemons.forEach(pokemon => {
    const li = document.createElement('li');
    li.className = 'pokemon-item';
    li.innerHTML = `
      <span class="pokemon-name">${pokemon.name}</span>
      <button class="details-btn">Подробнее</button>
    `;
    li.querySelector('.details-btn').addEventListener('click', () => showDetail(pokemon.url));
    listEl.appendChild(li);
  });
}

async function showDetail(url) {
  detailEl.innerHTML = '<p>Загрузка...</p>';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    renderPokemonDetail(data);
  } catch (error) {
    detailEl.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
}

function renderPokemonDetail(pokemon) {
  detailEl.innerHTML = `
    <div class="pokemon-card">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
           alt="${pokemon.name}" 
           class="pokemon-image"/>
      <div class="pokemon-stats">
        <p><strong>Рост:</strong> ${pokemon.height / 10} м</p>
        <p><strong>Вес:</strong> ${pokemon.weight / 10} кг</p>
        <p><strong>Типы:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Способности:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      </div>
    </div>
  `;
}

fetchPokemons();