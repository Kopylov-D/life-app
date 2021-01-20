import { Router } from "express";
import TodosController from "../controllers/TodosController";
import { auth } from "../middleware/auth.middleware";

const router = Router()

router.get('/', auth, TodosController.getTodosData)

router.get('/tasks', auth, TodosController.getTasks)
router.post('/tasks', auth, TodosController.addTask)

router.get('/targets', auth, TodosController.getTargets)
router.post('/targets', auth, TodosController.addTarget)

export default router