import { Response } from 'express';
import { User } from '../models/User';
import { Transaction } from '../models/Budget/Transaction';
import { Category } from '../models/Budget/Category';
import { FiltredDateType, RequestWithUser } from '../types/types';
import { Balance } from '../models/Budget/Balance';

class BudgetController {
	async getInfo(req: RequestWithUser, res: Response) {
		try {
			const existing = await User.findById(req.user);
			if (existing) {
				const transactions = await Transaction.find({}).populate('category');
				return res.json({ message: 'test', data: transactions });
			}
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	}

	async addTransaction(req: RequestWithUser, res: Response) {
		try {
			const { amount, categoryId, date, isExpense } = req.body;
			const newTransaction = new Transaction({
				amount,
				user: req.user,
				category: categoryId,
				date,
				isExpense,
			});

			await newTransaction.save();

			const transaction = await Transaction.findOne({
				_id: newTransaction._id,
			}).populate('category', 'name');

			res.status(201).json({ message: 'Транзакция добавлена', data: transaction });

			const transactions = await Transaction.find({ user: req.user }).sort({
				date: 1,
			});

			let value = 0;

			transactions.forEach(async transaction => {
				transaction.isExpense
					? (value -= transaction.amount)
					: (value += transaction.amount);

				await Balance.updateOne(
					{ transaction: transaction._id },
					{
						$set: {
							user: req.user,
							date: transaction.date,
							transaction: transaction._id,
							value,
						},
					},
					{ upsert: true }
				);
			});

			// const balance = await Balance.find({ user: req.user });
			// res.status(201).json({ message: 'Транзакция добавлена', balance, transaction });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async deleteTransaction(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
			await Transaction.findByIdAndDelete(id);
			const b = await Balance.findOne({ transaction: id });
			console.log(b);
			await Balance.findOneAndDelete({ transaction: id });
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
			res.status(201).json({ message: 'Категория создана', data: category });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getBudgetData(req: RequestWithUser, res: Response) {
		try {
			let { year, month, all, fullYear } = req.query;

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

			if (fullYear === 'true') {
				optionsDate = {
					$gte: formDate(year, '0'),
					$lt: formDate(year, '0', 12),
				};
			}

			if (all === 'true') {
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
			const firstTransaction = await Transaction.find({
				user: req.user,
			})
				.sort({ date: 1 })
				.limit(1);

			const options = {
				startDate: firstTransaction.length > 0 && firstTransaction[0].date,
			};

			const balance = await Balance.find({
				user: req.user,
				date: optionsDate,
			}).sort({ date: 1 });

			res
				.status(200)
				.json({ message: '', data: { transactions, categories, options, balance } });

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
			res.status(200).json({ message: '', data: transactions });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async getCategories(req: RequestWithUser, res: Response) {
		try {
			const categories = await Category.find({ user: req.user });
			res.status(200).json({ message: '', data: categories });
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
			await Category.findByIdAndUpdate(id, { name, color, isExpense });
			res.json({ message: 'Категория обновлена' });
		} catch (error) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}

	async deleteCategory(req: RequestWithUser, res: Response) {
		try {
			const { id } = req.params;
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
