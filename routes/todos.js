const express = require('express');
const todos = require('../controllers/todos');
const router = express.Router();

router.route('/')
    .get(todos.getTodos)
    .post(todos.createTodo)

router.route('/:todoId')
    .get(todos.getTodo)
    .put(todos.updateTodo)
    .delete(todos.deleteTodo)

module.exports = router;