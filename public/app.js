// Jquery - wait until web has finished loading
$(document).ready(function () {
    // get json from our todos api
    $.getJSON("/api/todos")
        .then(addTodos);

    // add a event listener when enter key press to input form
    $('#todoInput').keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this))
    })

    // add a event when user click on the span with X 
    // can not directly add to span item because span item was not created when page load
    // we add event to list class which existed from the beginning & then select span inside it
    $('.list').on('click', 'span', function(e){
        e.stopPropagation(); // not trigger parent's click event       
        removeTodo($(this).parent());
    })

});

function removeTodo(todo) {
     // get the id of clicked item
     let clickedId = todo.data('id'); // parent of span is list item
     
     let deleteUrl = '/api/todos/' + clickedId;
     // send ajax delete request
     $.ajax({
         method: 'DELETE',
         url: deleteUrl
     })
     .then(() => {       
        todo.remove();       

     })
}


function addTodos(todos) {
    // add todos to the page
    todos.forEach((todo) => {
        addTodo(todo);
    })
}

function addTodo(todo) {
    // Create a new list item with class = task
    let newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
    // add id attribute to newTodo to keep track of it
    newTodo.data('id', todo._id);   
    // add completed attribute to newTodo to keep track of it
    newTodo.data('completed', todo.completed);

    if (todo.completed) {
        newTodo.addClass("done");
    }
    // Add list item to our list (class = list)
    $('.list').append(newTodo);
}

function createTodo() {
    //send request to create new todo
    let usrInput = $('#todoInput').val(); // get user input
    $.post('/api/todos', { name: usrInput }) // post request to our api
        .then((newTodo) => {
            // reset the input text to blank
            $('#todoInput').val('');
            // add new todo to list
            addTodo(newTodo);
        })
        .catch((err) => {
            console.log(err);
        })
}

function updateTodo(todo) {
    let updateUrl = '/api/todos/' + todo.data('id');
    let isDone = !todo.data('completed')
    let updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then((updatedTodo) => {
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}