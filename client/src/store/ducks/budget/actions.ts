import { ThunkAction } from 'redux-thunk';
import { budgetApi } from '../../../services/api/budgetApi';
import { RootState } from '../../rootReducer';
import {
	FETCH_ERROR,
	FETCH_START,
	FETCH_SUCCESS,
	GET_BUDGETDATA,
	ADD_CATEGORY,
	UPDATE_CATEGORIES,
	GET_CATEGORIES,
	DELETE_CATEGORY,
	ADD_TRANSACTION,
	DELETE_TRANSACTION,
	// GET_TRANSACTIONS,
	DeleteCategoryType,
	// DeleteTransactionType,
	FetchErrorType,
	FetchStartType,
	FetchSuccsessType,
	GetBudgetDataType,
	GetCategoriesType,
	// GetTransactionsType,
	UpdateCategoriesType,
	BudgetDataType,
	BudgetActionsTypes,
} from './contracts/actionTypes';
import { CategoryInterface } from './contracts/state';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, BudgetActionsTypes>;

export function getBudgetData(
	year: string,
	month: string,
	all: boolean = false,
	fullYear: boolean = false
): ThunkType {
	return async dispatch => {
		dispatch(fetchStart());
		try {
			const { data } = await budgetApi.fetchBudgetData(year, month, all, fullYear);
			dispatch(fetchSuccess());
			dispatch(setBudgetData(data));
		} catch (e) {
			console.log(e);
			dispatch(fetchError(e));
		}
	};
}

export function getCategories(): ThunkType {
	return async dispatch => {
		dispatch(fetchStart());
		try {
			const { data } = await budgetApi.fetchCategories();
			dispatch(setCategories(data));
			dispatch(fetchSuccess());
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
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await budgetApi.addTransaction(
				categoryId,
				amount,
				isExpense,
				date
			);
			dispatch({ type: ADD_TRANSACTION, payload: data });
		} catch (e) {
			console.log(e);
		}
	};
}

export function deleteTransaction(_id: string): ThunkType {
	return async dispatch => {
		try {
			await budgetApi.deleteTransaction(_id);
			dispatch({ type: DELETE_TRANSACTION, payload: _id });
		} catch (e) {
			console.log(e);
		}
	};
}

export function addCategory(
	name: string = 'Новая категория',
	isExpense: boolean = true
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await budgetApi.addCategory(name, isExpense);
			dispatch({ type: ADD_CATEGORY, payload: data });
		} catch (e) {
			console.log(e);
		}
	};
}

export function changeCategory(
	_id: string,
	name: string,
	color: string,
	isExpense: boolean
): ThunkType {
	return async (dispatch, getState) => {
		const categories = getState().budget.categories;

		const newCategory = categories.map((item: CategoryInterface) => {
			if (item._id === _id) {
				name ? (item.name = name) : (name = item.name);
				color && (item.color = color);
				item.isExpense = isExpense;
			}
			return item;
		});

		await budgetApi.changeCategory(_id, name, color, isExpense);
		dispatch(updateCategories(newCategory));
	};
}

export function deleteCategory(id: string): ThunkType {
	return async dispatch => {
		await budgetApi.deleteCategory(id);
		dispatch(delCategory(id));
	};
}

function fetchStart(): FetchStartType {
	return {
		type: FETCH_START,
	};
}

function fetchSuccess(): FetchSuccsessType {
	return {
		type: FETCH_SUCCESS,
	};
}

function fetchError(error: Error): FetchErrorType {
	return {
		type: FETCH_ERROR,
		error,
	};
}

// function setTransactions(payload: TransactionInterface[]): GetTransactionsType {
// 	return {
// 		type: GET_TRANSACTIONS,
// 		payload,
// 	};
// }

function setBudgetData(payload: BudgetDataType): GetBudgetDataType {
	return {
		type: GET_BUDGETDATA,
		payload,
	};
}

function updateCategories(payload: CategoryInterface[]): UpdateCategoriesType {
	return {
		type: UPDATE_CATEGORIES,
		payload,
	};
}

function delCategory(payload: string): DeleteCategoryType {
	return {
		type: DELETE_CATEGORY,
		payload,
	};
}

function setCategories(payload: CategoryInterface[]): GetCategoriesType {
	return {
		type: GET_CATEGORIES,
		payload,
	};
}

// function delTransaction(payload: string): DeleteTransactionType {
// 	return {
// 		type: DELETE_TRANSACTION,
// 		payload,
// 	};
// }
