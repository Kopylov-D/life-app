import { BalanceInterface, CategoryInterface, OptionsInterface, TransactionInterface } from './state';

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const GET_BUDGETDATA = 'GET_BUDGETDATA';
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export type BudgetActionsTypes =
	| FetchStartType
	| FetchSuccsessType
	| FetchErrorType
	| GetBudgetDataType
	| UpdateCategoriesType
	| DeleteCategoryType
	| GetCategoriesType
	| DeleteTransactionType
	| AddTransactionType
	| AddCategoryType;

export type FetchStartType = {
	type: typeof FETCH_START;
};

export type FetchSuccsessType = {
	type: typeof FETCH_SUCCESS;
};

export type FetchErrorType = {
	type: typeof FETCH_ERROR;
	error: Error;
};

export type GetBudgetDataType = {
	type: typeof GET_BUDGETDATA;
	payload: BudgetDataType;
};

export type BudgetDataType = {
	transactions: TransactionInterface[];
	categories: CategoryInterface[];
	options: OptionsInterface;
	balance: BalanceInterface[];
};

export type UpdateCategoriesType = {
	type: typeof UPDATE_CATEGORIES;
	payload: CategoryInterface[];
};

export type DeleteCategoryType = {
	type: typeof DELETE_CATEGORY;
	payload: string;
};

export type GetCategoriesType = {
	type: typeof GET_CATEGORIES;
	payload: CategoryInterface[];
};

export type DeleteTransactionType = {
	type: typeof DELETE_TRANSACTION;
	payload: string;
};

export type AddCategoryType = {
	type: typeof ADD_CATEGORY;
	payload: CategoryInterface;
};

export type AddTransactionType = {
	type: typeof ADD_TRANSACTION;
	payload: TransactionInterface
};
