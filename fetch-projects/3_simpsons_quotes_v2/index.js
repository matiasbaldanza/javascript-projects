// DOM elements
const quoteElement = document.querySelector('[data-quote]');
const imageElement = document.querySelector('[data-image]');
const getRandomQuoteBtn = document.querySelector('[random-btn]')

const requestURL = 'https://thesimpsonsquoteapi.glitch.me/quotes';

// Events Listeners
getRandomQuoteBtn.addEventListener( 'click', async ()=> {
    showStatus();
    getQuote().then( quote => displayData(quote) );
});

async function getQuote() {
    const data = fetch(requestURL)
                        .then( response => response.json() )
                        .then( promiseData => ({ 
                                'quote': promiseData[0].quote,
                                'image': promiseData[0].image,
                                'character': promiseData[0].character
                            })
                        );
    return data;
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