import { Response } from 'express';
import { User } from '../models/User';
import { RequestWithUser } from '../types/types';

class BudgetController {
	async getInfo(req: RequestWithUser, res: Response) {
		try {
			const existing = await User.findById(req.user);
			if (existing) {
				return res.json({ user: existing });
			}
		} catch (e) {
			res
				.status(500)
				.json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	}
}

export default new BudgetController();
