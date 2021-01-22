import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import {
	CardInterface,
	ColorInterface,
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
	TodosDataInterface,
} from '../contracts/state';

export enum TodosActionTypes {
	SET_TARGETS = 'SET_TARGETS',
	SET_LOADING_STATUS = 'SET_LOADING',
	SET_TASKS = 'SET_TASKS',
	SET_TODOS_DATA = 'SET_TODOS_DATA',

	ADD_TARGET = 'ADD_TARGET',
	DELETE_TARGET = 'DELETE_TARGET',
	CHANGE_TARGET = 'CHANGE_TARGET',

	ADD_SUBTASK = 'ADD_SUBTASK',

	ADD_CARD = 'ADD_CARD',
	CHANGE_CARD = 'CHANGE_CARD',
	DELETE_CARD = 'DELETE_CARD',
}

export interface SetTargetsActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TARGETS;
	payload: TargetInterface[];
}

export interface SetLoadingStatusActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_LOADING_STATUS;
	payload: LoadingStatus;
}

//tasks
export interface SetTasksActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TASKS;
	payload: TaskInterface[];
}

export interface SetTodosDataActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TODOS_DATA;
	payload: TodosDataInterface;
}

/* targets **/
export interface AddTargetActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.ADD_TARGET;
	payload: TargetInterface;
}

export interface ChangeTargetActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.CHANGE_TARGET;
	payload: TargetInterface;
}

export interface DeleteTargetActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.DELETE_TARGET;
	payload: string;
}

/* subtasks **/
export interface AddSubtaskActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.ADD_SUBTASK;
	payload: SubtaskInterface;
}

export interface AddCardActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.ADD_CARD;
	payload: CardInterface;
}

export interface ChangeCardActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.CHANGE_CARD;
	payload: CardInterface;
}

export interface DeleteCardActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.DELETE_CARD;
	payload: string;
}
