const express = require('express');
const authController = require('../controllers/authController');
const todosController = require('../controllers/todosController');

const router = express.Router();

router.post(
    '/',
    authController.protect,
    todosController.createTodos
);

router
    .route('/:id')
    .get(
        authController.protect,
        todosController.getTodo
    )
    .patch(
        authController.protect,
        todosController.updateTodos
    )
    .delete(
        authController.protect,
        todosController.deleteTodos
    );

module.exports = router;