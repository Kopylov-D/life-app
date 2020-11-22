import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import BudgetController from '../controllers/BudgetController';

const router = Router();

router.get('/info', auth, BudgetController.getInfo);
router.post('/transactions/add-transaction', auth, BudgetController.addTransaction);
router.get('/transactions/get', auth, BudgetController.getTransactions)
router.post('/transactions/add-category', auth, BudgetController.addCategory)

export default router;
