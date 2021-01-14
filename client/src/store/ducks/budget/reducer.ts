import {
	FETCH_START,
	FETCH_SUCCESS,
	GET_TRANSACTIONS,
	ADD_CATEGORY,
	UPDATE_CATEGORIES,
	GET_CATEGORIES,
	DELETE_CATEGORY,
	ADD_TRANSACTION,
	DELETE_TRANSACTION,
	GET_BUDGETDATA,
	BudgetActionsTypes,
} from './contracts/actionTypes';
import { BudgetState } from './contracts/state';

const initialState: BudgetState = {
	transactions: [],
	categories: [],
	isLoading: true,
	error: { name: '', message: '' },
	date: {
		year: 2020,
		month: 10,
	},
	currentCategory: {
		_id: '',
		color: '',
		user: '',
		name: '',
		amount: 0,
		isExpense: true,
	},
	options: {
		startDate: '',
	},
	balance: [],
};

export const budgetReducer = (
	state = initialState,
	action: BudgetActionsTypes
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
		case GET_BUDGETDATA:
			return {
				...state,
				transactions: action.payload.transactions,
				categories: action.payload.categories,
				currentCategory: action.payload.categories.length > 0 ? action.payload.categories[0] : state.currentCategory,
				options: action.payload.options,
				balance: action.payload.balance,
			};
		case ADD_CATEGORY:
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		case ADD_TRANSACTION:
			const transaction = action.payload;
			const category = state.categories.find(
				item => item._id === transaction.category._id
			);

			const newTransaction = {
				...transaction,
				category: {
					_id: category!._id,
					name: category!.name,
				},
			};
			return {
				...state,
				transactions: [newTransaction, ...state.transactions],
				currentCategory: category!,
			};
		case DELETE_TRANSACTION:
			return {
				...state,
				transactions: state.transactions.filter(
					item => item._id !== action.payload
				),
			};
		case UPDATE_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(
					item => item._id !== action.payload
				),
			};
		default:
			return state;
	}
};
