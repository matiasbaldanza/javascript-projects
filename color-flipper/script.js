const colors = ['aqua', 'red', 'green', 'blue'];
const btn = document.getElementById('btn-switcher');
const main = document.querySelector("main")
const colorTag = document.getElementById('color-tag');

btn.addEventListener( 'click', () => {
    let oldColorNumber = colors.indexOf(main.style.backgroundColor);
    let newColorNumber = getRandomNumber();

    while (newColorNumber === oldColorNumber) {
        console.log(`color repetido, viejo: ${oldColorNumber}, nuevo: ${newColorNumber}`)
        newColorNumber = getRandomNumber();
    }

    main.style.backgroundColor = colors[newColorNumber];
    colorTag.textContent = colors[newColorNumber];
    colorTag.style.color = colors[newColorNumber];
    console.log
});



function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}