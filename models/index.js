let mongoose = require('mongoose');
mongoose.set('debug', true);

const dbUrl = 'mongodb://localhost:27017/Todo';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = Promise;

module.exports.Todo = require("./todo")