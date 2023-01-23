// DOM elements
const quoteElement = document.querySelector('[data-quote]');
const imageElement = document.querySelector('[data-image]');
const getRandomQuoteBtn = document.querySelector('[random-btn]')

const requestURL = 'https://thesimpsonsquoteapi.glitch.me/quotes';

// Events Listeners
getRandomQuoteBtn.addEventListener( 'click', async ()=> {
    showStatus();
    const quote = await getQuote();
    displayData(quote);
});

async function getQuote() {
    const response = await fetch(requestURL);
    const data = await response.json();
    console.log(data);
    return { 
        'quote': data[0].quote,
        'image': data[0].image,
        'character': data[0].character
    };
}

function showStatus() {
    quoteElement.textContent = "Querying the database...";
    imageElement.removeAttribute('src');
    imageElement.removeAttribute('alt');
    imageElement.removeAttribute('title');
}

function displayData(data) {
    quoteElement.textContent = data.quote;
    imageElement.setAttribute('src', data.image);
    imageElement.setAttribute('alt', data.character);
    imageElement.setAttribute('title', data.character);
}