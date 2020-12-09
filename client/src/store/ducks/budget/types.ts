export interface TransactionInterface {
	_id: string;
	category: {
		_id: string;
		name: string;
	};
	user: string;
	amount: number;
	// date: string;
	isExpense: boolean;
	date: Date;
	__v?: number;
}

export interface CategoryInterface {
	_id: string;
	name: string;
	amount: number;
	color: string;
	isExpense: boolean;

	// isSelected?: boolean;
}
