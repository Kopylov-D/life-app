import { Router } from 'express';
import AuthCtrl from '../controllers/AuthController';
import {
	loginValidations,
	registerValidations,
} from '../middleware/validation.middleware';

const router: Router = Router();

// /api/auth/register
router.post('/register', registerValidations, AuthCtrl.register);

router.post('/login', loginValidations, AuthCtrl.login);

export default router;
