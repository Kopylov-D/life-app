import { CurrentDate } from '../../../../types';
import { TransactionInterface, CategoryInterface, BalanceInterface } from '../types';

export type BudgetState = {
	transactions: TransactionInterface[];
	categories: CategoryInterface[];
	isLoading: boolean;
	error: Error;
	date: CurrentDate;
	currentCategory: CategoryInterface;
	options: OptionsInterface;
	balance: BalanceInterface[];
};

export type OptionsInterface = {
	startDate: string;
};
