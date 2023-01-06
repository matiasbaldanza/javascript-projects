import { applyAnimation } from "./imports/ui.js";

const localStorageKeyName = 'todos-1324-9876'
let todos = JSON.parse(localStorage.getItem(localStorageKeyName)) || [];

// DOM elements
const todoFormElement = document.querySelector('#add-todo-form');
const inputElement = document.querySelector('#content');

// Event listeners 
todoFormElement.addEventListener('submit', addTodo);

// Add a new Todo item
function addTodo(e) {
    e.preventDefault();
    
    const newTodo = {
        content: e.target.elements.content.value,
        done: false,
        createdAt: new Date().getTime()
    }

    // TODO: add validation before storing new todoItem
    if (newTodo.content.trim() === "") {
        applyAnimation(inputElement, "animation-error", 500);
        return;
    } 

    // store new todo
    todos = [...todos, newTodo];

    // update LocalStorage
    updateLocalStorage(localStorageKeyName, todos);

    // Reset the form
    e.target.reset();

    displayTodoList();
}

function updateLocalStorage(keyName, data) {
    localStorage.setItem(keyName, JSON.stringify(data));
}

function displayTodoList () {
    const todoList = document.querySelector('#todo-list');

    // delete list before displaying it from localStorage
    todoList.replaceChildren();
    
    todos.forEach(todo => {
        const todoItem = createTodoItem(todo);

        // show todoItem 
        todoList.append(todoItem);
    });
}

function createTodoItem(todo) {
    const todoItem = createElementWithClass('div', 'todo-item');

    // create the todo item's children elements
    
    // done checkbox
    const inputDone = createElementWithClass('input', 'checkbox');
    inputDone.type = 'checkbox';
    inputDone.checked = todo.done;

    // input with text content
    const inputContent = createElementWithClass('input', 'todo-content');
    inputContent.type = 'text';
    inputContent.setAttribute('readonly', true);
    inputContent.value = todo.content;

    const itemActions = createActionsToolbar(todo, inputContent);
    
    // assemble todoItem
    todoItem.append(inputDone, inputContent, itemActions);

    if (todo.done) {
        todoItem.classList.add('done');
    } 

    inputDone.addEventListener('change', (e) => {
        todo.done = e.target.checked;
        updateLocalStorage(localStorageKeyName, todos);

        todoItem.classList.toggle('done');
    })

    return todoItem;
}

function createElementWithClass(elementName, className) {
    const element = document.createElement(elementName);
    element.classList.add(className);

    return element;
}

function createActionsToolbar(todo, editableContent) {
    const actionsToolbar = document.createElement('div');
    actionsToolbar.classList.add('item-actions');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    // assemble actions-toolbar
    actionsToolbar.append(editButton, deleteButton);

    editButton.addEventListener('click', (e) => {
        actionsToolbar.classList.add('visible');
        editableContent.removeAttribute('readonly');
        editableContent.focus();

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        editButton.parentNode.replaceChild(saveButton, editButton);

        saveButton.addEventListener('click', saveItemChanges);
        editableContent.addEventListener('blur', saveItemChanges);
        editableContent.addEventListener('keypress', (e) => {
            if (e.key === "Enter") editableContent.blur();
        });

        function saveItemChanges(e) {
            editableContent.setAttribute('readonly', true);
            todo.content = e.target.value;
            updateLocalStorage(localStorageKeyName, todos);
            displayTodoList();
        }
    });

    deleteButton.addEventListener('click', (e) => {
        todos = todos.filter(item => item != todo);
        updateLocalStorage(localStorageKeyName, todos);
        displayTodoList();
    });

    return actionsToolbar;
}

// Initial render
displayTodoList();


