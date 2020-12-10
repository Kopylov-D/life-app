import { createSelector } from 'reselect';
import { RootState } from '../../rootReducer';
import { CategoryInterface, TransactionInterface } from './types';

export const selectTransactions = (state: RootState): TransactionInterface[] =>
	state.budget.transactions;
export const selectCategories = (state: RootState): CategoryInterface[] =>
	state.budget.categories;

// export const selectCategoriesForDropdown = (state: RootState) => {
// 	const categories = selectCategories(state)
// 	return categories.map(item => item.isSelected = false)
// }

export const selectCurrentCategory = (state: RootState) =>
	state.budget.currentCategory;

export const selectOptions = (state: RootState) => state.budget.options;

export const selectCategoriesWithAmount = createSelector(
	selectTransactions,
	selectCategories,
	(transactions, categories) => {
		return categories.map((category: any) => {
			category.amount = 0;
			transactions.forEach((transaction: any) => {
				if (transaction.category._id === category._id) {
					category.amount += transaction.amount;
				}
			});
			return category;
		});
	}
);

export const selectExample = (state: RootState) => {
	return state.budget.categories;
};
