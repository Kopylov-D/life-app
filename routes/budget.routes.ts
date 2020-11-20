import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import BudgetController from '../controllers/BudgetController';

const router = Router();

router.get('/info', auth, BudgetController.getInfo);
router.get('/tr', auth, BudgetController.addTransaction);

export default router;
