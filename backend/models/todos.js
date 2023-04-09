const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide todos text']
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Todo = mongoose.model('todos', todosSchema);

module.exports = Todo;