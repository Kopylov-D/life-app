export interface TransactionInterface {
	_id: string;
	category: string;
	user: string,
	amount: number;
	date: string;
	// date: Date;
	__v: number;
}

export interface CategoryInterface {
	_id: string;
	type: 'expense' | 'income',
	name: string;
	color: string;
}
