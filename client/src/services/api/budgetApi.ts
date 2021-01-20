import { BudgetDataInterface } from '../../store/ducks/budget/contracts/state';
import { CategoryInterface, TransactionInterface } from '../../store/ducks/budget/types';
import { instance as axios, Response } from './index';

export const budgetApi = {
	addTransaction: (
		categoryId: string,
		amount: number,
		isExpense: boolean,
		date: Date | Date[] | undefined
	) =>
		axios
			.post<Response<TransactionInterface>>('/api/budget/transactions', {
				categoryId,
				amount,
				date,
				isExpense,
			})
			.then(res => res.data)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),
	//ошибка, когда не поставлен слеш перед началом
	deleteTransaction: (_id: string) =>
		axios.delete<Response<Object>>(`/api/budget/transactions/${_id}`).catch(e => {
			throw new Error(e.response.data.message || 'Что-то пошло не так');
		}),

	fetchBudgetData: (year: string, month: string, all: boolean, fullYear: boolean) =>
		axios
			.get<Response<BudgetDataInterface>>(
				`/api/budget?year=${year}&month=${month}&all=${all}&fullYear=${fullYear}`
			)
			.then(res => res.data),

	fetchTransactions: () => axios.get(`/api/budget/transactions`),

	fetchCategories: () =>
		axios
			.get<Response<CategoryInterface[]>>('/api/budget/categories')
			.then(res => res.data)
			.catch(e => {
				throw new Error(e.response.data.message || 'Что-то пошло не так');
			}),

	addCategory: (name: string, isExpense: boolean) =>
		axios
			.post<Response<CategoryInterface>>('/api/budget/categories', { name, isExpense })
			.then(res => res.data),

	changeCategory: (_id: string, name: string, color: string, isExpense: boolean) =>
		axios
			.patch<Response<null>>(`/api/budget/categories/${_id}`, {
				name,
				color,
				isExpense,
			})
			.then(res => res.data),

	deleteCategory: (_id: string): any =>
		axios.delete<Response<null>>(`/api/budget/categories/${_id}`).then(res => res.data),
};
