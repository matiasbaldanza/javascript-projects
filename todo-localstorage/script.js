window.addEventListener('load', () => {
    /* read localStorage */
    const todoFormElement = document.querySelector('#add-todo-form');
    
    /* Retrieve list from LocalStorage and display it */
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    DisplayTodoList();
    
    todoFormElement.addEventListener('submit', e => {
        e.preventDefault();
    
        const newTodo = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // store new todo
        todos = [...todos, newTodo];

        // update LocalStorage
        localStorage.setItem('todos', JSON.stringify(todos));

        // Reset the form
        e.target.reset();

        DisplayTodoList();
    })

    function DisplayTodoList () {
        const todoList = document.querySelector('#todo-list');
        todoList.innerHTML = "";
        
        todos.forEach(todo => {
            // create the todo item
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item')
    
            // create the todo item's children elements
            
            // done checkbox
            const inputDone = document.createElement('input');
            inputDone.type = 'checkbox';
            inputDone.value = todo.done;

            // input with text content
            const inputContent = document.createElement('input');
            inputContent.type = 'text';
            inputContent.value = todo.content;

            // actions-toolbar
            const itemActions = document.createElement('div');
            itemActions.classList.add('item-actions');
            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = 'Edit';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');

            // assemble actions-toolbar
            itemActions.append(editButton, deleteButton);

            // assemble todoItem
            todoItem.append(inputDone, inputContent, itemActions);

            // show todoItem 
            todoList.append(todoItem);


        })
        

    }
})


