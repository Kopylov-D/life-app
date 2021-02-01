import { LoadingStatus } from '../../../types';

export interface TodosState {
	tasks: TaskInterface[];
	subtasks: SubtaskInterface[];
	targets: TargetInterface[];
	colors: ColorInterface[];
	cards: CardInterface[];
	loadingStatus: LoadingStatus;
	error: Error;
}

export enum Priority {
	'high' = '1',
	'middle' = '2',
	'low' = '3',
}

export interface TaskInterface {
	_id: string;
	// user: string;
	target?: string;
	subtask?: string;
	name: string;
	isDone: boolean;
	notes: string;
	color?: string;
	priority?: Priority;
	date: Date;
	level: number;
	expiresIn?: Date;
}

export interface SubtaskInterface {
	_id: string;
	// user: string;
	target?: string;
	task: string;
	name: string;
	isDone: boolean;
	color?: string;
	priority?: Priority;
	date: Date;
	level: number;
	expiresIn?: Date;
}

export interface ColorInterface {
	_id: string;
	name: string;
	hex: string;
}

export interface TargetInterface {
	_id: string;
	// user: string;
	name: string;
	isDone: boolean;
	notes: string;
	priority?: Priority;
	date: Date;
	color?: string;
	expiresIn?: Date;
}

export interface CardInterface {
	_id: string;
	user?: string;
	name: string;
	color?: string;
	level: number;
}

export interface TodosDataInterface {
	tasks: TaskInterface[];
	subtasks: SubtaskInterface[];
	targets: TargetInterface[];
	colors: ColorInterface[];
	cards: CardInterface[];
}
