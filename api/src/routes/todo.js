import express from 'express';
import TodoController from '../controllers/todo';

const router = express.Router();

router.get('/', TodoController.getTodos);
router.post('/', TodoController.createTodo);
router.put('/', TodoController.updateTodo);
router.delete('/:id',TodoController.removeTodo);

export default router;