export interface TransactionInterface {
	_id: string;
	category: {
		_id: string;
		name: string;
	};
	user: string;
	amount: number;
	isExpense: boolean;
	date: string;
	// __v?: number;
}

export interface CategoryInterface {
	_id: string;
	user: string;
	name: string;
	amount: number;
	color: string;
	isExpense: boolean;
	// __v?: number;
}

export interface BalanceInterface {
	_id: string;
	date: string;
	user: string;
	value: number;
}
