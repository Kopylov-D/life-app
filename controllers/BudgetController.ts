import { Request, Response } from 'express';
import { User } from '../models/User';
import { Transaction } from '../models/Budget/Transaction';
import { Category } from '../models/Budget/Category';
import { FiltredDateType, RequestWithUser } from '../types/types';
import { type } from 'os';

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
			const { amount, categoryId, date, isExpense } = req.body;
			const transaction = new Transaction({
				amount,
				user: req.user,
				category: categoryId,
				date,
				isExpense,
			});

			await transaction.save();
			res.status(201).json({ message: 'Транзакция добавлена', transaction });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async deleteTransaction(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
			console.log(req);
			await Transaction.findByIdAndDelete(id);
			res.status(200).json({ message: 'Транзакция удалена' });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async addCategory(req: RequestWithUser, res: Response) {
		try {
			const { name, isExpense } = req.body;
			const category = new Category({ user: req.user, isExpense, name });
			await category.save();
			res.status(201).json({ message: 'Категория создана', category });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getBudgetData(req: RequestWithUser, res: Response) {
		try {
			let { year, month, all } = req.query;

			const formDate = (year: any, month: any, to = 0) => {
				if (year && month) {
					return new Date(+year, +month + to, 1);
				} else {
					return new Date();
				}
			};

			let optionsDate: FiltredDateType = {
				$gte: formDate(year, month),
				$lt: formDate(year, month, 1),
			};

			if (!month) {
				optionsDate = {
					$gte: formDate(year, '0'),
					$lt: formDate(year, '0', 12),
				};
			}

			if (all === 'all') {
				optionsDate = {
					$gte: new Date(1900),
					$lt: new Date(),
				};
			}

			const transactions = await Transaction.find({
				user: req.user,
				date: optionsDate,
			})
				.sort({ date: -1 })
				.populate('category', 'name');

			const categories = await Category.find({ user: req.user });
			const firstTransaction = await Transaction.find()
				.sort({ date: 1 })
				.limit(1);

			const options = {
				startDate: firstTransaction[0].date,
			};
			res.status(200).json({ transactions, categories, options });

			// console.log(firstTr[0].date);
			// const date = firstTr[0].date;
			// const startFrom = Date.parse(date.toISOString());
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getTransactions(req: RequestWithUser, res: Response) {
		try {
			const transactions = await Transaction.find({ user: req.user })
				.sort({ date: -1 })
				.populate('category', 'name');
			res.status(200).json({ transactions });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getCategories(req: RequestWithUser, res: Response) {
		try {
			const categories = await Category.find({ user: req.user });
			res.status(200).json({ categories });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async test(req: RequestWithUser, res: Response) {
		try {
			console.log(req.params);
			res.status(200).json({ message: req.params });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async changeCategory(req: RequestWithUser, res: Response) {
		try {
			const { name, color, isExpense } = req.body;
			const { id } = req.params;
			console.log(id);
			await Category.findByIdAndUpdate(id, { name, color, isExpense });
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
			res.status(200).json({ message: 'Категория удалена' });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
}

export default new BudgetController();
