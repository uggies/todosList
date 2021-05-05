
const mongoose = require('mongoose');
// mongoose.set('debug', true);

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('open', () => console.log("db connected"));
db.once('error', () => console.log("DB error!!!"))


// mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
