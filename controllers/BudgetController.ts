import { Request, Response } from 'express';
import { User } from '../models/User';
import { Transaction } from '../models/Budget/Transaction';
import { Category } from '../models/Budget/Category';
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

	async addTransaction(req: RequestWithUser, res: Response) {
		try {
			const { amount, categoryName } = req.body;
			const category = await Category.findOne({ name: categoryName });
			const transaction = new Transaction({
				amount,
				user: req.user,
				category: category!._id,
			});

			await transaction.save();
			let transactions = await Transaction.find({
				user: req.user,
				category: undefined,
			});

			res.status(201).json({ message: 'Транзакция добавлена', transactions });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async addCategory(req: RequestWithUser, res: Response) {
		try {
			const {name, color} = req.body
			console.log(req.body)
			const category = new Category({
				name,
				color
			})
			await category.save()
			console.log(category)
			res.status(201).json({message: 'Категория создана'})
		} catch (e) {
			console.log(e)
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getTransactions(req: RequestWithUser, res: Response) {
		try {
			// const transaction = new Transaction()
			const transactions = await Transaction.find({ user: req.user });
			const categories = await Category.find({ user: req.user });
			res.json({ transactions, categories });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}
}

export default new BudgetController();
