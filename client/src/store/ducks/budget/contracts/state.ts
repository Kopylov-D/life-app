import { TransactionInterface, CategoryInterface } from "../types";

export type BudgetState = {
	items: TransactionInterface[];
	categories: CategoryInterface[];
	isLoading: boolean;
	error: Error;
};