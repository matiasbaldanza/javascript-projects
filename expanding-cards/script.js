const container = document.querySelector('.container');

container.addEventListener('click', (event) => {
        if (event.target.className === 'panel') {
            Array.from(container.children).forEach(child => {
                    child.classList.remove('active'); 
            });
            event.target.classList.add('active');
        }
    });



