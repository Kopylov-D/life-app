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
				// return res.json({ user: existing });

				// const categories = await Category.find({}).populate('user')
				// const categories = await Category.find({})
				const transactions = await Transaction.find({}).populate('category');
				return res.json({ data: transactions });
			}
		} catch (e) {
			res
				.status(500)
				.json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	}

	async addTransaction(req: RequestWithUser, res: Response) {
		try {
			const { amount, id, date, isExpense } = req.body;
			const transaction = new Transaction({
				amount,
				user: req.user,
				category: id,
				date,
				isExpense
			});

			await transaction.save();
			// const newTran = await transaction.populate('category', 'name');
			res.status(201).json({ message: 'Транзакция добавлена', transaction });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async deleteTransaction(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
			await Transaction.findByIdAndDelete(id);
			res.status(201).json({ message: 'Транзакция удалена' });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async addCategory(req: RequestWithUser, res: Response) {
		try {
			const category = new Category({ user: req.user });
			await category.save();
			res.status(201).json({ message: 'Категория создана', category });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getBudgetData(req: RequestWithUser, res: Response) {
		try {
			let { year, month } = req.query;
			console.log(year, month);
			// const formDate = (year: string, month: string) => {
			// 	return `${year}-${month}-00T00:00:00.000Z`;
			// };
			const formDate = (year: any, month: any, to = 0) => {
				if (year && month) {
					return new Date(+year, +month + to, 1);
				} else {
					return new Date();
				}
			};
			const transactions = await Transaction.find({
				user: req.user,
				date: {
					$gte: formDate(year, month),
					$lt: formDate(year, month, 1),
				},
			}).populate('category', 'name');
			const categories = await Category.find({ user: req.user });
			const firstTr = await Transaction.find().sort({ date: 1 }).limit(1);
			console.log(firstTr[0].date);
			const date = firstTr[0].date;
			const startFrom = Date.parse(date.toISOString());
			res.json({ transactions, categories, firstTr });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getCategories(req: RequestWithUser, res: Response) {
		try {
		} catch (e) {}
	}

	async changeCategory(req: RequestWithUser, res: Response) {
		try {
			const { name, color } = req.body;
			const { id } = req.params;
			console.log(id)
			await Category.findByIdAndUpdate(id, { name, color });
			res.json({ message: 'update' });
		} catch (error) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async deleteCategory(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
			console.log(req.params);
			// if (!Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
			await Transaction.deleteMany({ category: id });
			await Category.findByIdAndRemove(id);
			res.json({ message: 'Категория удалена' });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
}

export default new BudgetController();
