
$('document').ready(function() {

    $.ajax({
        url: '/api/todos',
        method: 'get'
    })
    .then( todos => {
        todos.forEach(todo => {
             addTodo(todo);
        })
    })
    
    $('#todoInput').keypress( function(e) {
        if (e.which == 13) {
            createTodo();
        }
    })

    $('.list').on('click', 'li', function(e) {
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });
})

function addTodo(todo) {
    // console.log(todo)
    let newTodo  = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if ( todo.completed ) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    const input = $('#todoInput').val();
    $.post('/api/todos', {name: input})
    .then( newTodo => {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(err => console.log(err))
}

function removeTodo(todo) {
    const url = '/api/todos/' + todo.data('id');
    $.ajax({
        method: 'delete',
        url
    })
    .then(data=> {
        todo.remove();
    })
    .catch(err=> console.log(err));
}

function updateTodo(todo) {
    let isDone = !todo.data('completed');
    const url = '/api/todos/' + todo.data('id');
    $.ajax({
        method: "PUT",
        url,
        data : {
            completed: isDone
        }
    })
    .then( data => {
        todo.toggleClass('done');
        todo.data('completed', isDone)
    });
}