import c from 'config';
import { api } from '../../../services/api';
import {
	FETCH_ERROR,
	FETCH_START,
	FETCH_SUCCESS,
	GET_TRANSACTIONS,
	ADD_CATEGORY,
} from './actionTypes';
import { TransactionInterface } from './types';

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
			const response = await api.addCategory(name, color)
			const category = response.data.category
			console.log(category)
		// dispatch({ type: ADD_CATEGORY });

		} catch (e) {
			console.log(e)
			
		}
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

// type AddCategory = {
// 	type: typeof GET_TRANSACTIONS;
// 	payload: TransactionInterface[];
// };
