const colors = ['aqua', 'red', 'green', 'blue'];
const btn = document.getElementById('btn-switcher');
const main = document.querySelector("main")
const colorTag = document.getElementById('color-tag');

btn.addEventListener( 'click', () => {
    /* TODO: ensure that the random number is different from the current number */
    const newColorNumber = getRandomNumber();
    main.style.backgroundColor = colors[newColorNumber];
    colorTag.textContent = colors[newColorNumber];
    colorTag.style.color = colors[newColorNumber];
    console.log
});



function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}