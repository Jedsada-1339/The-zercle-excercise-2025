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
                          <img src="./src/img/loading.png" alt="Loading..." class="w-24 h-24 sm:w-32 sm:h-32 animate-spin" />
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
           class="absolute bottom-1 right-1 h-24 sm:h-28 opacity-25 drop-shadow-lg"/>
    `;
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

// Initial load
fetchAndDisplay();
