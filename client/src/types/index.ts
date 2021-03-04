export interface Month {
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
}

export interface SelectItems {
	id: string;
	value: string;
	some?: any;
}

export interface CurrentDate {
	year: number;
	month: number;
}

export interface CategorySelect {
	id: string;
	title: string;
	isSelected: boolean;
}

export interface MenuItem {
	to: string;
	title: string;
	icon?: Icons;
	component?: React.FC;
	bage?: number | string;
}

export interface BackdropInterface {
	onClick(): void;
	type?: 'black';
}

export enum Icons {
	close = 'close',
	board = 'board',
	backlog = 'backlog',
	issues = 'issues',
	accounting = 'accounting',
	categories = 'categories',
	operations = 'operations',
	report = 'report',
}

export enum Colors {
	red = 'red',
	orange = 'orange',
	blue = 'blue',
}

export interface CoordinatesInterface {
	left: number;
	top: number;
}

export interface CategoryEditorParams {
	value: string;
	type?: 'add' | 'change';
	isExpense: boolean;
	color?: string;
}

export enum Placement {
	auto = 'auto',
	top = 'top',
	bottom = 'bottom',
	bottomLeft = 'bittom-left',
}
