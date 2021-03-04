import { CategoryInterface } from './ducks/budget/contracts/state';

export enum LoadingStatus {
	LOADED = 'LOADED',
	LOADING = 'LOADING',
	ERROR = 'ERROR',
	SUCCESS = 'SUCCESS',
}

export interface BalanceChartInterface {
	name: string;
	value: number;
	balance: number;
}

export interface ColumnsChartInterface {
	name: string;
	expense: number;
	income: number;
}

export interface SelectCategoriesWithAmount {
	categories: CategoryInterface[];
	proportion: {
		income: number;
		expense: number;
		percentIncome: number;
		percentExpense: number;
	};
}
