const form = document.querySelector('form');
const input = document.querySelector('input');
const todos = document.querySelector('ul');

const renderToDos = (datas) => {
    const liElements = document.querySelectorAll('li');
    liElements.forEach(li => {
        li.remove()
    });
    datas.forEach( data => {
        const id = data.id;
        const content = data.content;
        const checked = data.checked; //boolean.
        const todo = document.createElement('li')
        todo.setAttribute('id', id);
        const p = document.createElement('p');
        p.textContent = content;
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        if(checked === true) {
            input.checked = true;
        };
        const button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.textContent = 'Delete';
        todo.append(p, input, button);
        todos.append(todo);
        button.addEventListener('click', () => deleteToDo(id));
    })
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputValue = input.value;
    if (inputValue === '') {
        return;
    };
    try {
    const response = await fetch('http://localhost:3000/server', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ inputValue })
    });
    const todoDatas = await response.json();
    renderToDos(todoDatas);

    } catch(error) {
        console.error('エラー:', error);
    }
});


init();

async function init() {
    try {
        const response = await fetch('http://localhost:3000/server', {
            method: 'GET',
        })
        const todoDatas = await response.json();
        renderToDos(todoDatas);
    } catch(error) {
        console.error('エラー:', error)
    }
};

async function deleteToDo(id) {
    try {
        const response = await fetch(`http://localhost:3000/server/${id}`, {
            method: 'DELETE',
        })
        const todoDatas = await response.json();
        renderToDos(todoDatas);

    } catch(error) {
        console.error('エラー:', error)
    }
}