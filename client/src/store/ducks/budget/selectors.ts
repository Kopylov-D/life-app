import { createSelector } from 'reselect';
import { RootState } from '../../rootReducer';

export const selectTransactions = (state: RootState) => state.budget.transactions;
export const selectCategories = (state: RootState) => state.budget.categories;

export const categoriesWithAmount = createSelector(
	selectTransactions,
	selectCategories,
	(transactions, categories) => {
		return categories.map((category: any) => {
			category.amount = 0;
			transactions.forEach((transaction: any) => {
				if (transaction.category === category._id) {
					category.amount += transaction.amount;
				}
			});
			return category;
		});
	}
);

// export const selectCategories = (state: RootState) => {
// 	const categories = [...state.budget.categories];
// 	const transactions = [...state.budget.items];

// 	let arr = [];

// 	arr = categories.map((category: any) => {
// 		category.amount = 0;
// 		transactions.forEach((transaction: any) => {
// 			if (transaction.category === category._id) {
// 				category.amount += transaction.amount;
// 			}
// 		});
// 		return category;
// 	});

// 	return arr;
// };

export const selectExample = (state: RootState) => {
	return state.budget.categories;
};
