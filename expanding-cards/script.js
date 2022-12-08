const panels = document.querySelectorAll('.panel');

function removeClassActiveFromAllPanels() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeClassActiveFromAllPanels();
        panel.classList.add('active');
    })
});



