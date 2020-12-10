import { api } from '../../../services/api';
import {
	FETCH_ERROR,
	FETCH_START,
	FETCH_SUCCESS,
	GET_BUDGETDATA,
	ADD_CATEGORY,
	UPDATE_CATEGORIES,
	// SET_CATEGORIES,
	DELETE_CATEGORY,
	ADD_TRANSACTION,
	DELETE_TRANSACTION,
	GET_TRANSACTIONS,
} from './contracts/actionTypes';
import { Options } from './contracts/state';
import { CategoryInterface, TransactionInterface } from './types';

export function getBudgetData(year: string, month: string) {
	return async (dispatch: any) => {
		dispatch(fetchStart());
		try {
			const { data } = await api.fetchBudgetData(year, month);
			dispatch(fetchSuccess());
			dispatch(setBudgetData(data));
		} catch (e) {
			console.log(e);
			// dispatch(authError(e.message));
			dispatch(fetchError(e));
		}
	};
}

export function getTransactions() {
	return async (dispatch: any) => {
		dispatch(fetchStart());
		try {
			const { data } = await api.fetchTransactions();
			console.log(data)
			dispatch(setTransactions(data));
		} catch (e) {
			console.log(e);
		}
	};
}

export function addTransaction(
	categoryId: string,
	amount: number,
	isExpense: boolean,
	date: Date | Date[] | undefined = undefined
) {
	return async (dispatch: any) => {
		try {
			const { data } = await api.addTransaction(
				categoryId,
				amount,
				isExpense,
				date
			);
			const transaction = {
				...data.transaction,
			};
			console.log(transaction);
			dispatch({ type: ADD_TRANSACTION, payload: data.transaction });
		} catch (e) {
			console.log(e);
		}
	};
}

export function deleteTransaction(_id: string) {
	return async (dispatch: any) => {
		try {
			await api.deleteTransaction(_id);
			dispatch({ type: DELETE_TRANSACTION, payload: _id });
		} catch (e) {
			console.log(e);
		}
	};
}

export function addCategory(isExpense: boolean) {
	return async (dispatch: any) => {
		try {
			const { data } = await api.addCategory(isExpense);
			dispatch({ type: ADD_CATEGORY, payload: data.category });
		} catch (e) {
			console.log(e);
		}
	};
}

export function changeCategory(_id: string, name: string, color: string) {
	return async (dispatch: any, getState: any) => {
		const state = getState();
		const categories = state.budget.categories;

		// console.log(state)
		const newCAt = categories.map((item: any) => {
			if (item._id === _id) {
				if (name) {
					item.name = name;
				}
				if (color) {
					item.color = color;
				}
			}
			return item;
		});

		const res = await api.changeCategory(_id, name, color);
		console.log(res);

		dispatch(updateCategories(newCAt));
	};
}

export function deleteCategory(id: string) {
	return async (dispatch: any) => {
		await api.deleteCategory(id);
		dispatch(delCategory(id));
	};
}

type FetchStartType = {
	type: typeof FETCH_START;
};

function fetchStart(): FetchStartType {
	return {
		type: FETCH_START,
	};
}

type FetchSuccsessType = {
	type: typeof FETCH_SUCCESS;
};

function fetchSuccess(): FetchSuccsessType {
	return {
		type: FETCH_SUCCESS,
	};
}

type FetchErrorType = {
	type: typeof FETCH_ERROR;
	error: Error;
};

function fetchError(error: Error): FetchErrorType {
	return {
		type: FETCH_ERROR,
		error,
	};
}

type GetTransactions = {
	type: typeof GET_TRANSACTIONS;
	payload: TransactionInterface[];
};

function setTransactions(payload: TransactionInterface[]): GetTransactions {
	return {
		type: GET_TRANSACTIONS,
		payload,
	};
}

type getBudgetData = {
	type: typeof GET_BUDGETDATA;
	payload: BudgetData;
};

type BudgetData = {
	transactions: TransactionInterface[];
	categories: CategoryInterface[];
	options: Options;
};

function setBudgetData(payload: BudgetData): getBudgetData {
	return {
		type: GET_BUDGETDATA,
		payload,
	};
}

type UpdateCategories = {
	type: typeof UPDATE_CATEGORIES;
	payload: CategoryInterface[];
};

function updateCategories(payload: CategoryInterface[]): UpdateCategories {
	return {
		type: UPDATE_CATEGORIES,
		payload,
	};
}

type DeleteCategory = {
	type: typeof DELETE_CATEGORY;
	payload: string;
};

function delCategory(payload: string): DeleteCategory {
	return {
		type: DELETE_CATEGORY,
		payload,
	};
}

type DeleteTransaction = {
	type: typeof DELETE_TRANSACTION;
	payload: string;
};

function delTransaction(payload: string): DeleteTransaction {
	return {
		type: DELETE_TRANSACTION,
		payload,
	};
}

type AddCategory = {
	type: typeof ADD_CATEGORY;
	payload: CategoryInterface;
};

// function Category(payload: string): DeleteCategory {
// 	return {
// 		type: DELETE_CATEGORY,
// 		payload,
// 	};
// }

// type AddCategory = {
// 	type: typeof GET_TRANSACTIONS;
// 	payload: TransactionInterface[];
// };
