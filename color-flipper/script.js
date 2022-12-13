const colors = ['aqua', 'red', 'green', 'blue'];
const btn = document.getElementById('btn-switcher');
const main = document.querySelector("main")
const colorTag = document.getElementById('color-tag');

btn.addEventListener( 'click', () => {
    const oldColor = main.style.backgroundColor;
    let newColor = colors[getRandomNumber()];

    while (newColor === oldColor) {
        newColor = colors[getRandomNumber()];
    }
    
    main.style.backgroundColor = newColor;
    colorTag.textContent = newColor;
    colorTag.style.color = newColor; 
});



function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}