import { FETCH_START, FETCH_SUCCESS, GET_TRANSACTIONS, ADD_CATEGORY } from './actionTypes';
import { CategoryInterface, TransactionInterface } from './types';

type InitialStateType = {
	items: TransactionInterface[];
	categories: CategoryInterface[];
	isLoading: boolean;
	error: Error;
};

const initialState: InitialStateType = {
	items: [
		{
			amount: -55,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '123421346767546',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: -55,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '123421346767546',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
		{
			amount: 200,
			date: '2020-11-20T13:55:29.402Z',
			user: '5fb250b7e6ab891d20b020c9',
			category: '123421346767546',
			__v: 0,
			_id: '5fb7cad19cd9171bd081598c',
		},
	],
	categories: [
		{ _id: '123421346767546', color: 'red', type: 'expense', name: 'Одежда' },
		{ _id: '123421345475676', color: 'green', type: 'expense', name: 'Разное' },
		{ _id: '565745675674757', color: 'orange', type: 'expense', name: 'Счета' },
	],
	isLoading: true,
	error: { name: '', message: '' },
};

const formArr = (cat: any, trans: any): any => {
	let arr = [];
	// const obj = { _id: '123421346767546', color: 'red', type: 'expense', name: 'Одежда', amount: 0, }

	// for (let i = 0; i < cat.length; i++) {
	// 	const id = cat[i]._id
	// 	for (let j = 0; j < trans.length; i++) {
	// 		if (trans[j].category === id) {

	// 		}
	// 	}
	// }

	arr = cat.map((cItem: any) => {
		trans.forEach((t: any) => {
			if (t.category === cItem._id) {
				if (cItem.amount) {
					cItem.amount += t.amount;
					console.log(cItem.amount)
				} else {
					cItem.amount = t.amount;
					console.log(cItem.amount)

				}
			}
		});
		return cItem;
	});

	console.log('arr', arr);
};

formArr(initialState.categories, initialState.items);

export const budgetReducer = (
	state = initialState,
	action: any
): InitialStateType => {
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
		default:
			return state;
	}
};
