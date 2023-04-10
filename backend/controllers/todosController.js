const Todos = require('./../models/todos');
const Users = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setUserIds = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
};


exports.createTodos = catchAsync(async (req, res, next) => {
    const todo = await Todos.create(req.body);
     await Users.findByIdAndUpdate(req.user.id, {
        $push: { "todos": todo._id },
    });

    res.status(201).json({
        status: 'success',
        todo
    });
});
exports.getTodo = factory.getOne(Todos);
exports.updateTodos = factory.updateOne(Todos);
exports.deleteTodos = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Todos.findByIdAndDelete(id);
    await Users.findByIdAndUpdate(req.user.id, {
        $pull: { "todos": id },
    });

    res.status(201).json({
        status: 'success',
    });
})