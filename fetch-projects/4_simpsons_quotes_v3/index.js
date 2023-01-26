// DOM elements
const getQuoteRandomButton = document.querySelector('[get-quote-random-btn]');
const statusRandomElement = document.querySelector('[status-code-random]');
const responseDataRandomElement = document.querySelector('[response-data-random]');

const getQuoteCharacterButton = document.querySelector('[get-quote-char-btn]');
const getQuoteCharacterInput = document.querySelector('[get-quote-char-input]');
const statusCharacterElement = document.querySelector('[status-code-char]');
const responseDataCharacterElement = document.querySelector('[response-data-char]')
const imgCharacterElement = document.querySelector('[img-char]')

// API request
let requestURLRandom = new URL('https://thesimpsonsquoteapi.glitch.me/quotes');
let requestURLCharacter = new URL('https://thesimpsonsquoteapi.glitch.me/quotes');

// event handlers
getQuoteRandomButton.addEventListener('click', handleClickRandomQuote );
getQuoteCharacterButton.addEventListener('click', handleClickCharacterQuote );
/* statusRandomElement.addEventListener();
statusCharacterElement.addEventListener(); */


async function handleClickRandomQuote() {
    showStatus('Querying the API...', statusRandomElement);
    getQuoteRandomButton.disabled = true;
    
    const responseData = await executeRequest(requestURLRandom);

    const responseText = `
                            "${responseData[0].quote}" </br></br>
                            —${responseData[0].character}
                            `;
    showResponse(responseText, responseDataRandomElement);
    getQuoteRandomButton.disabled = false;

    showStatus(' ', statusRandomElement);
}

async function handleClickCharacterQuote() {
    showStatus('Querying the API...', statusCharacterElement);
    getQuoteCharacterButton.disabled = true;
    
    requestURLCharacter.searchParams.set('character', getQuoteCharacterInput.value);     // <-- TODO: NOT SANITIZED!!!
    const responseData = await executeRequest(requestURLCharacter);

    const responseText = `
                            "${responseData[0].quote}" </br></br>
                            —${responseData[0].character}
                            `;
    const responseImg = responseData[0].image;
    showResponse(responseText, responseDataCharacterElement);
    
    imgCharacterElement.src = responseImg;
    imgCharacterElement.alt = responseData[0].character;
    imgCharacterElement.title = responseData[0].character;
    
    getQuoteCharacterButton.disabled = false;

    showStatus(' ', statusCharacterElement);
}

async function executeRequest(requestURL) {
    let responseData = '';
    
    try {
        const responsePromise = await fetch(requestURL);

        if (!responsePromise.ok) {
            throw new Error('Bad reponse. Status code: ', responsePromise.status);
        }

        responseData = await responsePromise.json();

    } catch(error) {
        console.log(error);
    } finally {

    }
    return responseData;
}

function showResponse(response, element) {
    element.innerHTML = response;
}

function showStatus(status, element) {
    element.textContent = status;
}
