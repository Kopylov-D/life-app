export type AuthData = {
	token: string;
	userId: string;
};

export type User = {
	_id: string;
	email: string;
	password: string;
};

export type Selector = {
	months?: Month[];
	years?: number[];
};

export type Month = {
	id: number;
	name:
		| 'Январь'
		| 'Февраль'
		| 'Март'
		| 'Апрель'
		| 'Май'
		| 'Июнь'
		| 'Июль'
		| 'Август'
		| 'Сентябрь'
		| 'Октябрь'
		| 'Ноябрь'
		| 'Декабрь';
};

export type Year = {
	id: number;
	name: string;
};

export type CurrentDate = {
	year: number;
	month: number;
};
