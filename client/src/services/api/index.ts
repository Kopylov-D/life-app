import axios from 'axios';
import { BudgetDataType } from '../../store/ducks/budget/contracts/actionTypes';
import {
	BalanceInterface,
	CategoryInterface,
	TransactionInterface,
} from '../../store/ducks/budget/types';

export const getAuthData = () => {
	const jwtTokenCookie: RegExpMatchArray | null = document.cookie.match(
		`(^|; )jwtToken=([^;]*)`
	);
	const userIdCookie: RegExpMatchArray | null = document.cookie.match(
		`(^|; )userId=([^;]*)`
	);

	if (jwtTokenCookie) {
		const token: string = jwtTokenCookie[2];
		const userId: string = userIdCookie![2];

		return {
			token,
			userId,
		};
	}

	return {
		token: null,
		userId: null,
	};
};

axios.interceptors.request.use(config => {
	config.headers['Authorization'] = `Bearer ${getAuthData().token}`;
	return config;
});

type LoginResponseType = {
	token?: string;
	userId?: string;
	message?: string;
	errors?: Array<string>;
};

type MessageResponseType = {
	message: string;
};

type AddCategory = {
	message: string;
	category: CategoryInterface;
};

type AddTransaction = {
	message: string;
	transaction: TransactionInterface;
	// balance: BalanceInterface;
};

// Сделать классом
export const api = {
	register: (email: string, password: string) =>
		axios
			.post('/api/auth/register', {
				email,
				password,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	login: (email: string, password: string) =>
		axios
			.post<LoginResponseType>('/api/auth/login', {
				email,
				password,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	getUser: () => axios.get('/api/budget/info'),
	test: (id: string) => axios.delete(`/api/budget/test/${id}`),

	addTransaction: (
		categoryId: string,
		amount: number,
		isExpense: boolean,
		date: Date | Date[] | undefined
	) =>
		axios
			.post<AddTransaction>('/api/budget/transactions', {
				categoryId,
				amount,
				date,
				isExpense,
			})
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),
	//ошибка, когда не поставлен слеш перед началом
	deleteTransaction: (_id: string) =>
		axios
			.delete<MessageResponseType>(`/api/budget/transactions/${_id}`)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	fetchBudgetData: (
		year: string,
		month: string,
		all: boolean,
		fullYear: boolean
	) =>
		axios.get<BudgetDataType>(
			`/api/budget?year=${year}&month=${month}&all=${all}&fullYear=${fullYear}`
		),

	fetchTransactions: () => axios.get(`/api/budget/transactions`),

	fetchCategories: () =>
		axios.get<CategoryInterface[]>('/api/budget/categories').catch(e => {
			throw new Error(e.response.data.message || 'Что-то пошло не так');
		}),

	addCategory: (name: string, isExpense: boolean) =>
		axios.post<AddCategory>('/api/budget/categories', { name, isExpense }),

	changeCategory: (
		_id: string,
		name: string,
		color: string,
		isExpense: boolean
	) =>
		axios.patch<MessageResponseType>(`/api/budget/categories/${_id}`, {
			name,
			color,
			isExpense,
		}),

	deleteCategory: (_id: string): any =>
		axios.delete<MessageResponseType>(`/api/budget/categories/${_id}`),
};

// export const {jwtToken} = getAuthData()

// const instance = axios.create({
// 	headers: {
// 		"Authorization": `Bearer ${getAuthData().jwtToken}`
// }
// })
