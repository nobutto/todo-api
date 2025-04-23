import express from 'express';
import cors from 'cors';
import fs from 'fs';
const PORT = '3000';

//jsonを読み込み
function roadTodos() {
    const data = fs.readFileSync('todos.json', 'utf-8');
    return JSON.parse(data);
}

//jsonに書き込み
function changeTodos(todos) {
    fs.writeFileSync('todos.json', JSON.stringify(todos));
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/server', async (req, res) => {
    let todos = roadTodos();
    const newToDo = {
        id: Date.now(),
        content: req.body.inputValue,
        checked: false,
    }
    todos.push(newToDo);
    changeTodos(todos);
    res.json(todos);
})

app.get('/server', async (req, res) => {
    let todos = roadTodos();
    res.json(todos);
})

app.delete('/server/:id', async (req, res) => {
    let todos = roadTodos();
    const id = Number(req.params.id);
    const response = todos.filter(todo => {
       return todo.id !== id
    });
    changeTodos(response);
    res.json(response);

})

app.listen(PORT, () => {
    console.log('サーバーが起動しました')
})