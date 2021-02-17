import { CategoryInterface } from '../store/ducks/budget/types';

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
	categories?: CategoryInterface[];
	items: (CategoryInterface | Month)[];
};

export type Month = {
	id: string;
	value:
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
		| 'Декабрь'
		| 'Весь год';
};

export type Year = {
	id: number;
	name: string;
};

export type CurrentDate = {
	year: number;
	month: number;
};

export type CategorySelect = {
	id: string;
	title: string;
	isSelected: boolean;
};

export type MenuItem = {
	to: string
	title: string
	img?: string
	component?: React.FC
}

export interface BackdropInterface  {
	onClick(): void;
	type?: 'black';
};

export enum Icons {
	closec = 'closec'
}

export enum Colors {
	red = 'red',
	orange = 'orange',
	blue = 'blue'
}

export interface CoordinatesInterface {
	left: number | null
	top: number | null
}
