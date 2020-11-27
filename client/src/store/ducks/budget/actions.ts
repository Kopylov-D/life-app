import c from 'config';
import { api } from '../../../services/api';
import {
	FETCH_ERROR,
	FETCH_START,
	FETCH_SUCCESS,
	GET_TRANSACTIONS,
	ADD_CATEGORY,
	UPDATE_CATEGORIES,
} from './contracts/actionTypes';
import { CategoryInterface, TransactionInterface } from './types';

const formArr = (cat: any, trans: any): any => {
	let arr = [];

	arr = cat.map((cItem: any) => {
		trans.forEach((t: any) => {
			if (t.category === cItem._id) {
				if (cItem.amount) {
					cItem.amount += t.amount;
					// console.log(cItem.amount)
				} else {
					cItem.amount = t.amount;
					// console.log(cItem.amount)
				}
			}
		});
		return cItem;
	});

	console.log('arr', arr);
	return arr;
};

export function getTransactionsData() {
	return async (dispatch: any) => {
		dispatch(fetchStart());
		try {
			const { data } = await api.getTransactions();
			const transactions = data.transactions;
			dispatch(fetchSuccess());
			dispatch(getTransactions(transactions));
		} catch (e) {
			console.log(e);
			// dispatch(authError(e.message));
			dispatch(fetchError(e));
		}
	};
}

export function addTransaction(amount: number, categoryName: string) {
	return async (dispatch: any) => {
		try {
			await api.addTransaction(amount, categoryName);
		} catch (e) {
			console.log(e);
		}
	};
}

export function addCategory(name: string, color: string) {
	return async (dispatch: any) => {
		try {
			const response = await api.addCategory(name, color);
			const category = response.data.category;
			console.log(category);
			// dispatch({ type: ADD_CATEGORY });
		} catch (e) {
			console.log(e);
		}
	};
}

export function changeCategory(_id: string, name: string, color: string) {
	return (dispatch: any, getState: any) => {
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

		dispatch(updateCategories(newCAt));
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

function getTransactions(payload: TransactionInterface[]): GetTransactions {
	return {
		type: GET_TRANSACTIONS,
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

// type AddCategory = {
// 	type: typeof GET_TRANSACTIONS;
// 	payload: TransactionInterface[];
// };
