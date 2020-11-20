import { Request, Response } from 'express';
import { User } from '../models/User';
import { RequestWithUser } from '../types/types';
import {Transaction} from '../models/Budget/Transaction'

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

	async addTransaction(req: RequestWithUser, res: Response) {
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

	// async addTransaction(req: RequestWithUser, res: Response) {
	// 	try {
	// 		console.log(req.user)
	// 		// const {amount} = req.body

	// 		// const transaction = new Transaction({amount: 20})

	// 		// console.log(transaction)

	// 		// await transaction.save()

	// 		res.status(201).json({message: 'Транзакция добавлена'})

	// 	} catch (e) {
	// 		res.status(500).json({ message: 'Что-то пошло не так' });
	// 	}
	// }

	async getTransactions(req: Request, res: Response) {
		try {
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}
}

export default new BudgetController();
