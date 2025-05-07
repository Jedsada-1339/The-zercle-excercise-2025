const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const randomBtn = document.getElementById('random-btn');

const quoteList = document.getElementById('quote-list');
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
let totalQuotes = 0;

async function loadRandomQuote() {
    quoteText.textContent = 'Loading...';
    quoteAuthor.textContent = '';
    try {
        const res = await fetch('https://dummyjson.com/quotes/random');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `by ${data.author}`;
    } catch (error) {
        quoteText.textContent = 'Failed to load quote.';
        console.error("Error fetching quote:", error);
    }
}

randomBtn.addEventListener('click', loadRandomQuote);
window.addEventListener('DOMContentLoaded', loadRandomQuote);

async function fetchQuotes(page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    const response = await fetch(`https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    totalQuotes = data.total;
    renderQuotes(data.quotes);
    renderPagination(page, limit, totalQuotes);
}

function renderQuotes(quotes) {
    quoteList.innerHTML = '';
    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = "border border-gray-200 rounded-lg p-4 bg-white shadow-md hover:shadow-xl cursor-pointer hover:scale-105 transition delay-150 duration-300";
        quoteCard.innerHTML = `
          <p class="font-medium italic text-gray-800">"${quote.quote}"</p>
          <p class="text-sm text-gray-500 mt-1">by ${quote.author}</p>
        `;
        quoteList.appendChild(quoteCard);
    });
}

function renderPagination(currentPage, limit, totalItems) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / limit);

    const createButton = (text, page, isActive = false, disabled = false) => {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = `px-3 py-1 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`;
        if (!disabled && !isActive) {
            btn.addEventListener('click', () => {
                currentPage = page;
                fetchQuotes(currentPage, parseInt(itemsPerPageSelect.value));
            });
        }
        return btn;
    };

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createButton(i, i, i === currentPage));
        }
    } else {
        paginationContainer.appendChild(createButton(1, 1, currentPage === 1));

        if (currentPage > 3) {
            paginationContainer.appendChild(createButton('...', null, false, true));
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            paginationContainer.appendChild(createButton(i, i, i === currentPage));
        }

        if (currentPage < totalPages - 2) {
            paginationContainer.appendChild(createButton('...', null, false, true));
        }

        paginationContainer.appendChild(createButton(totalPages, totalPages, currentPage === totalPages));
    }
}

itemsPerPageSelect.addEventListener('change', () => {
    currentPage = 1;
    fetchQuotes(currentPage, parseInt(itemsPerPageSelect.value));
});

window.addEventListener('DOMContentLoaded', () => {
    fetchQuotes(currentPage, parseInt(itemsPerPageSelect.value));
});