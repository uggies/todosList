const { Todo } = require('../models');


module.exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        // console.log(todos);
        res.send(todos);    
    }
    catch(err) {
        res.send(err);
    }
}

module.exports.createTodo = async (req, res) => {
    // console.log(req.body);
    try {
        const todo = new Todo(req.body);
        console.log(todo);
        const data = await todo.save();
        res.json(data);    
    }
    catch(err) {
        res.send(err)
    }
}

module.exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.json({message: 'We deleted it!'});    
    } 
    catch(err) {
        res.send(err);
    }
}

module.exports.updateTodo = async (req, res) => {
    try {
        console.log(req.body);
        const todo = await Todo.findByIdAndUpdate(
            {_id: req.params.id}, req.body, {new : true}
        )
        res.json(todo);
    }
    catch(err) {
        res.send(err);
    }
}