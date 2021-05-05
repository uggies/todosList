const express = require('express');

const app = express();

const { getTodos, createTodo, deleteTodo, updateTodo} = require('./helpers/todos');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'))

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/api/todos', getTodos )

app.post('/api/todos', createTodo )

app.delete('/api/todos/:id', deleteTodo )

app.put('/api/todos/:id', updateTodo )

app.listen(3000, () => console.log("Server running on port 3000"));