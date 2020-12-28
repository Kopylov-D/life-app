import { createSelector } from 'reselect';
import { formatDate } from '../../../services/utils/dateUtils';
import { RootState } from '../../rootReducer';
import { Options } from './contracts/state';
import { CategoryInterface, TransactionInterface } from './types';

export const selectTransactions = (state: RootState): TransactionInterface[] =>
	state.budget.transactions;
export const selectCategories = (state: RootState): CategoryInterface[] =>
	state.budget.categories;

export const selectIsLoading = (state: RootState): boolean =>
	state.budget.isLoading;

export const selectCurrentCategory = (state: RootState) =>
	state.budget.currentCategory;

export const selectOptions = (state: RootState): Options =>
	state.budget.options;

export type SelectCategoriesWithAmount = {
	categories: CategoryInterface[];
	proportion: {
		income: number;
		expense: number;
		percentIncome: number;
		percentExpense: number;
	};
};

export const selectCategoriesWithAmount = createSelector(
	selectTransactions,
	selectCategories,
	(
		transactions: TransactionInterface[],
		categories: CategoryInterface[]
	): SelectCategoriesWithAmount => {
		let expense = 0;
		let income = 0;

		const categoriesWithAmount = categories.map(
			(category: CategoryInterface) => {
				category.amount = 0;
				transactions.forEach((transaction: TransactionInterface) => {
					if (transaction.category._id === category._id) {
						const value = transaction.amount;
						category.amount += value;
						category.isExpense ? (expense += value) : (income += value);
					}
				});
				return category;
			}
		);

		const percentIncome = (income * 100) / (expense + income);
		const percentExpense = 100 - percentIncome;

		return {
			categories: categoriesWithAmount,
			proportion: {
				income,
				expense,
				percentIncome,
				percentExpense,
			},
		};
	}
);

type DataChartType = {
	name: string;
	value: number;
	balance: number;
};

export const selectDataChart = createSelector(
	selectTransactions,
	(transactions: TransactionInterface[]): DataChartType[] => {
		const result: DataChartType[] = [];

		let sum = 0;
		let name = '';
		let balance = 0;

		transactions.forEach((transaction, index) => {
			if (index === 0) {
				sum = transaction.amount;
				name = formatDate(transaction.date);
			} else {
				if (
					formatDate(transaction.date) ===
					formatDate(transactions[index - 1].date)
				) {
					transaction.isExpense
						? (sum -= transaction.amount)
						: (sum += transaction.amount);
				} else {
					result.push({
						value: sum,
						name,
						balance,
					});
					sum = transaction.amount;
					name = formatDate(transaction.date);
				}
			}

			if (index === transactions.length - 1) {
				result.push({
					value: sum,
					name,
					balance,
				});
			}

			console.log(balance);
		});

		return result;
	}
);

export const selectColumns = createSelector(
	selectTransactions,
	(transactions: TransactionInterface[]): DataChartType[] => {
		const result: DataChartType[] = [];

		let sum = 0;
		let name = '';
		let balance = 0;

		transactions.forEach((transaction, index) => {
			if (index === 0) {
				sum = transaction.amount;
				name = formatDate(transaction.date);
			} else {
				if (
					formatDate(transaction.date) ===
					formatDate(transactions[index - 1].date)
				) {
					transaction.isExpense
						? (sum -= transaction.amount)
						: (sum += transaction.amount);
				} else {
					result.push({
						value: sum,
						name,
						balance,
					});
					sum = transaction.amount;
					name = formatDate(transaction.date);
				}
			}

			if (index === transactions.length - 1) {
				result.push({
					value: sum,
					name,
					balance,
				});
			}

			console.log(balance);
		});

		return result;
	}
);

export const selectBalanceChart = createSelector(
	selectTransactions,
	(transactions: TransactionInterface[]): DataChartType[] => {
		const result: DataChartType[] = [];

		let sum = 0;
		let name = '';
		let balance = 0;

		transactions = transactions.reverse();

		transactions.forEach(transaction => {
			transaction.isExpense
				? (balance -= transaction.amount)
				: (balance += transaction.amount);

			name = formatDate(transaction.date);

			result.push({
				name,
				value: sum,
				balance,
			});
		});

		return result;
	}
);
