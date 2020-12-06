import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import BudgetController from '../controllers/BudgetController';

const router = Router();

router.get('/info', auth, BudgetController.getInfo);
router.get('/', auth, BudgetController.getBudgetData)
router.post('/transactions', auth, BudgetController.addTransaction);
router.delete('/transactions/:id', auth, BudgetController.deleteTransaction);
router.post('/categories', auth, BudgetController.addCategory)
router.patch('/categories/:id', auth, BudgetController.changeCategory)
router.delete('/categories/:id', auth, BudgetController.deleteCategory)

export default router;
