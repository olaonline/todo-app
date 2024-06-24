const mongoose = require('mongoose');

const Todos = mongoose.model('Todos', {task: String, isCompleted: Boolean});

module.exports = Todos;