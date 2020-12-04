export interface TransactionInterface {
	_id: string;
	category: {
		_id: string,
		name: string
	};
	user: string,
	amount: number;
	date: string;
	// date: Date;
	__v?: number;
}

export interface CategoryInterface {
	_id: string;
	// type: 'expense' | 'income',
	name: string;
	amount: number;
	color: string;
}
