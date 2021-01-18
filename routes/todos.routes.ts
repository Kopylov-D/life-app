import { Router } from "express";
import TodosController from "../controllers/TodosController";
import { auth } from "../middleware/auth.middleware";

const router = Router()

router.post('/tasks', auth, TodosController.addTask)

export default router