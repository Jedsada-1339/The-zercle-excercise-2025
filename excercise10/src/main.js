const genRanges = [
  [1, 151], [152, 251], [252, 386], [387, 493],
  [494, 649], [650, 721], [722, 809], [810, 905], [906, 1010]
];

const typeColors = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
  grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
  ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
  steel: '#B7B7CE', fairy: '#D685AD'
};

const genButtonsContainer = document.getElementById('gen-buttons');
const sortSelect = document.getElementById('sort');
const pokemonList = document.getElementById('pokemon-list');

// Create generation buttons
genRanges.forEach((_, index) => {
  const btn = document.createElement('button');
  btn.textContent = indexToRoman(index + 1);
  btn.className = 'px-3 py-2 hover:bg-gray-200 cursor-pointer border-b-4 border-transparent text-sm sm:text-base';
  btn.dataset.gen = index;
  genButtonsContainer.appendChild(btn);
});

// Load types into dropdown
fetch('https://pokeapi.co/api/v2/type')
  .then(res => res.json())
  .then(data => {
    data.results.forEach(type => {
      const opt = document.createElement('option');
      opt.value = type.name;
      opt.textContent = capitalize(type.name);
      sortSelect.appendChild(opt);
    });
  });

let currentGen = 0;
let currentType = 'all';

// Event listeners
genButtonsContainer.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    currentGen = parseInt(e.target.dataset.gen);
    document.querySelectorAll('#gen-buttons button').forEach(btn => {
      btn.classList.remove('bg-gray-200', 'border-b-4', 'border-indigo-500', 'border-transparent');
    });
    e.target.classList.add('bg-gray-200', 'border-b-4', 'border-indigo-500');
    fetchAndDisplay();
  }
});

sortSelect.addEventListener('change', e => {
  currentType = e.target.value;
  fetchAndDisplay();
});

function fetchAndDisplay() {
  const [start, end] = genRanges[currentGen];
  pokemonList.innerHTML = `<div role="status" class="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
                          <img src="./src/img/loading.png" alt="Loading..." class="h-44 sm:h-62 animate-spin" />
                          <span class="sr-only">Loading...</span>
                          </div>`;
  const promises = [];
  for (let i = start; i <= end; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
  }
  Promise.all(promises).then(pokemons => {
    let filtered = pokemons;
    if (currentType !== 'all') {
      filtered = pokemons.filter(p => p.types.some(t => t.type.name === currentType));
    }
    renderCards(filtered);
  });
}

function renderCards(pokemons) {
  pokemonList.innerHTML = '';
  pokemons.forEach(p => {
    const card = document.createElement('div');
    const primaryType = p.types[0].type.name;
    const bgColor = typeColors[primaryType] || '#888';
    card.className = `
      text-white 
      p-4 sm:p-6 lg:p-8 
      rounded-3xl shadow-xl 
      relative 
      w-64 sm:w-72 md:w-80 
      h-60 sm:h-64 md:h-72 
      overflow-hidden 
      hover:scale-105 
      transition delay-100 duration-300
      cursor-pointer
    `;
    card.style.backgroundColor = bgColor;
    card.innerHTML = `
      <p class="absolute top-2 right-4 text-white/30 text-2xl sm:text-3xl md:text-4xl font-bold">
        #${String(p.id).padStart(3, '0')}
      </p>
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">${capitalize(p.name)}</h2>
      <div class="flex flex-col gap-2 sm:gap-3">
        ${p.types.map(t =>
      `<span class="bg-white/30 hover:bg-white/40 text-white px-3 py-1 rounded-xl text-xs sm:text-sm font-semibold w-fit cursor-pointer">
              ${capitalize(t.type.name)}
           </span>`).join('')}
      </div>
      <img src="${p.sprites.other['official-artwork'].front_default}" 
           alt="${p.name}" 
           class="absolute bottom-2 right-2 h-28 sm:h-32 md:h-36 drop-shadow-lg z-20"/>

      <img src="./src/img/BG/BG.png" 
           alt="${p.name}" 
           class="absolute bottom-1 right-1 h-24 sm:h-38 opacity-25 drop-shadow-lg"/>
    `;
    card.addEventListener('click', () => openModal(p));
    pokemonList.appendChild(card);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function indexToRoman(num) {
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  return roman[num - 1];
}

function openModal(pokemon) {
  const modal = document.getElementById('modal');
  const modalCard = modal.querySelector('.modal-card');
  const detailBox = modal.querySelector('.bg-white');

  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType] || '#60A5FA';

  modalCard.style.backgroundColor = bgColor;
  modal.querySelector('h2').textContent = capitalize(pokemon.name);
  modal.querySelector('.absolute.top-4.right-6').textContent = `#${String(pokemon.id).padStart(3, '0')}`;

  const modalImage = modal.querySelector('.pokemon-image');
  modalImage.src = pokemon.sprites.other['official-artwork'].front_default;
  modalImage.alt = pokemon.name;

  const typeContainer = modal.querySelector('.type-container');
  typeContainer.innerHTML = '';
  pokemon.types.forEach(t => {
    const span = document.createElement('span');
    span.className = 'bg-white/30 text-white px-4 py-1 rounded-full text-base font-semibold';
    span.textContent = capitalize(t.type.name);
    typeContainer.appendChild(span);
  });

  // About Section
  const rows = detailBox.querySelectorAll('tbody tr');
  rows[0].children[1].textContent = pokemon.types.map(t => capitalize(t.type.name)).join(', ');
  rows[1].children[1].textContent = (pokemon.height / 10).toFixed(1) + ' m';
  rows[2].children[1].textContent = (pokemon.weight / 10).toFixed(1) + ' kg';
  rows[3].children[1].textContent = pokemon.abilities.map(a => capitalize(a.ability.name)).join(', ');

  // Base Stats Section
  const statsTbody = document.querySelector('#statsSection tbody');
  statsTbody.innerHTML = '';

  let total = 0;

  pokemon.stats.forEach(stat => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const valueCell = document.createElement('td');

    nameCell.className = 'py-2 font-medium text-gray-700';
    valueCell.className = 'py-2 text-gray-900';

    nameCell.textContent = formatStatName(stat.stat.name);
    valueCell.textContent = stat.base_stat;

    row.appendChild(nameCell);
    row.appendChild(valueCell);
    statsTbody.appendChild(row);
  });

  modal.classList.remove('hidden');

  const statsSection = document.getElementById('statsSection').querySelector('tbody');
  statsSection.innerHTML = ''; // Clear old data

  pokemon.stats.forEach(stat => {
    const statName = formatStatName(stat.stat.name);
    const value = stat.base_stat;
    total += value;
    const barWidth = Math.min(value, 150); // limit bar width

    const row = document.createElement('tr');
    const barColor = value < 50 ? 'bg-orange-400' : 'bg-indigo-500';

    row.innerHTML = `
      <td class="font-[200] text-gray-700 pr-8 pt-4">${statName}</td>
      <td class="py-1 text-right w-12 pt-4">${value}</td>
      <td class="py-1 pl-2 w-50 pt-4">
        <div class="bg-gray-200 rounded h-3">
          <div class="${barColor} h-3 rounded" style="width: ${barWidth}px"></div>
        </div>
      </td>
    `;
    statsSection.appendChild(row);
  });

  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
  <td class="font-[200] text-gray-700 pr-8 pt-4">Total</td>
  <td class="py-1 text-right w-12 pt-4">${total}</td>
  <td class="py-1 pl-2 w-50 pt-4">
    <div class="bg-gray-200 rounded h-3">
      <div class="bg-green-600 h-3 rounded" style="width: ${Math.min(total / 3, 150)}px"></div>
    </div>
  </td>
`;
  statsTbody.appendChild(totalRow);
}

function formatStatName(name) {
  switch (name) {
    case 'hp': return 'HP';
    case 'attack': return 'Attack';
    case 'defense': return 'Defense';
    case 'special-attack': return 'Sp. Atk';
    case 'special-defense': return 'Sp. Def';
    case 'speed': return 'Speed';
    default: return capitalize(name);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });

  const tabAbout = document.getElementById('tabAbout');
  const tabStats = document.getElementById('tabStats');
  const aboutSection = document.getElementById('aboutSection');
  const statsSection = document.getElementById('statsSection');

  tabAbout.addEventListener('click', () => {
    aboutSection.classList.remove('hidden');
    statsSection.classList.add('hidden');
    tabAbout.classList.add('border-b-2', 'border-midnight-100');
    tabStats.classList.remove('border-b-2', 'border-midnight-100');
  });

  tabStats.addEventListener('click', () => {
    aboutSection.classList.add('hidden');
    statsSection.classList.remove('hidden');
    tabStats.classList.add('border-b-2', 'border-midnight-100');
    tabAbout.classList.remove('border-b-2', 'border-midnight-100');
  });
});

fetchAndDisplay();
