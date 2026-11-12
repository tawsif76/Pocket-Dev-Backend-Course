import { Router } from 'express';
import { addTodoController, deleTodo, listTodo } from '../controllers/todoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const todoRouter = Router();
todoRouter.use(authMiddleware);

todoRouter.post('/', addTodoController);
todoRouter.get('/', listTodo);
todoRouter.delete('/:id', deleTodo);

export default todoRouter;
