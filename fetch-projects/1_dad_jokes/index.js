// DOM Elements
const jokeElement = document.querySelector('[data-joke]');
const jokeButton = document.querySelector('[joke-btn]');
let joke = {};

const getURL = 'https://dad-jokes.p.rapidapi.com/random/joke';
const options = { 
    method: 'GET',
    headers: { 'X-RapidAPI-Key':  
        '7102a390bcmshceda4d6dc7ae2fep1bc646jsn9aaf0e659f0c',
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    }
};

jokeButton.addEventListener('click', () => {
    getJoke();
    displayJoke();    
});

function getJoke() {
    fetch(getURL, options)
        .then( (response) => response.json())
        .then( (data) => {
            joke = {
                'setup': data.body[0].setup,
                'punchline': data.body[0].punchline
            }
        });
}

function displayJoke() {
    if (Object.values(joke).length !== 0)
    jokeElement.textContent = `
        ${joke.setup}
        ${joke.punchline}
    `;
}



