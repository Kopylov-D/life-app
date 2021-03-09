import { Router } from 'express';
import TodosController from '../controllers/TodosController';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', auth, TodosController.getTodosData);
router.patch('/', auth, TodosController.syncTodos);
router.delete('/', auth, TodosController.multiplyDelete);

router.get('/tasks', auth, TodosController.getTasks);
router.post('/tasks', auth, TodosController.addTask);
router.patch('/tasks/:id', auth, TodosController.updateTask);
router.delete('/tasks/:id', auth, TodosController.deleteTask);

router.get('/targets', auth, TodosController.getTargets);
router.post('/targets', auth, TodosController.addTarget);
router.delete('/targets/:id', auth, TodosController.deleteTarget);
router.patch('/targets/:id', auth, TodosController.updateTarget);

router.post('/subtasks', auth, TodosController.addSubtask);
router.delete('/subtasks/:id', auth, TodosController.deleteSubtask);

router.post('/cards', auth, TodosController.addCard);
router.patch('/cards/:id', auth, TodosController.updateCard);
router.delete('/cards/:id', auth, TodosController.deleteCard);

export default router;
