import {
	FETCH_START,
	FETCH_SUCCESS,
	GET_TRANSACTIONS,
	ADD_CATEGORY,
	UPDATE_CATEGORIES,
} from './contracts/actionTypes';
import { BudgetState } from './contracts/state';

const initialState: BudgetState = {
	items: [
		{
			amount: 100,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '1',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 100,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '1',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 300,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '2',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 500,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '3',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
	],
	categories: [
		{ _id: '1', color: 'red', type: 'expense', name: 'Одежда', amount: 200 },
		{ _id: '2', color: 'green', type: 'expense', name: 'Разное', amount: 20 },
		{ _id: '3', color: 'orange', type: 'expense', name: 'Счета', amount: 333 },
	],
	isLoading: true,
	error: { name: '', message: '' },
};

const initial: BudgetState = {
	items: [
		{
			amount: 100,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '1',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 100,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '1',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 300,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '2',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 500,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '3',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
	],
	categories: [
		{ _id: '1', color: 'red', type: 'expense', name: 'Одежда', amount: 20 },
		{ _id: '2', color: 'green', type: 'expense', name: 'Разное', amount: 20 },
		{ _id: '3', color: 'orange', type: 'expense', name: 'Счета', amount: 200 },
	],
	isLoading: true,
	error: { name: '', message: '' },
};

export const budgetReducer = (
	state = initialState,
	action: any
): BudgetState => {
	switch (action.type) {
		case FETCH_START:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case GET_TRANSACTIONS:
			return {
				...state,
				items: action.payload,
			};
		case ADD_CATEGORY:
			return {
				...state,
				items: action.payload,
			};
		case UPDATE_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		default:
			return state;
	}
};
