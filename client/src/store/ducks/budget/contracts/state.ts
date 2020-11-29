import { TransactionInterface, CategoryInterface } from "../types";

export type BudgetState = {
	transactions: TransactionInterface[];
	categories: CategoryInterface[];
	isLoading: boolean;
	error: Error;
};