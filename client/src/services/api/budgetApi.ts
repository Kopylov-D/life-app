import {
	BudgetDataInterface,
	CategoryInterface,
	TransactionInterface,
} from '../../store/ducks/budget/contracts/state';
import { instance as axios, Response } from './index';

export const budgetApi = {
	addTransaction: (transaction: TransactionInterface) =>
		axios
			.post<Response<TransactionInterface>>('/api/budget/transactions', {
				...transaction,
				_id: null,
			})
			.then(res => res.data),

	//ошибка, когда не поставлен слеш перед началом
	deleteTransaction: (_id: string) =>
		axios.delete<Response<null>>(`/api/budget/transactions/${_id}`).then(res => res.data),

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
			.then(res => res.data),

	addCategory: (category: CategoryInterface) =>
		axios
			.post<Response<CategoryInterface>>('/api/budget/categories', { ...category })
			.then(res => res.data),

	changeCategory: (category: CategoryInterface) =>
		axios
			.patch<Response<null>>(`/api/budget/categories/${category._id}`, {
				...category,
			})
			.then(res => res.data),

	deleteCategory: (_id: string): any =>
		axios.delete<Response<null>>(`/api/budget/categories/${_id}`).then(res => res.data),
};
