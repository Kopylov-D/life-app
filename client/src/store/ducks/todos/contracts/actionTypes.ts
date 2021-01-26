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
	SET_LOADING_STATUS = 'SET_LOADING',
	SET_TODOS_DATA = 'SET_TODOS_DATA',

	ADD_TASK_TO_CARD = 'ADD_TASK_TO_CARD',

	SET_TARGETS = 'SET_TARGETS',
	ADD_TARGET = 'ADD_TARGET',
	DELETE_TARGET = 'DELETE_TARGET',
	CHANGE_TARGET = 'CHANGE_TARGET',

	SET_TASKS = 'SET_TASKS',
	ADD_TASK = 'ADD_TASK',
	DELETE_TASK = 'DELETE_TASK',
	CHANGE_TASK = 'CHANGE_TASK',

	ADD_SUBTASK = 'ADD_SUBTASK',

	ADD_CARD = 'ADD_CARD',
	CHANGE_CARD = 'CHANGE_CARD',
	DELETE_CARD = 'DELETE_CARD',
}

export interface SetLoadingStatusActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_LOADING_STATUS;
	payload: LoadingStatus;
}

export interface SetTodosDataActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TODOS_DATA;
	payload: TodosDataInterface;
}

export interface SetTargetsActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TARGETS;
	payload: TargetInterface[];
}

export interface AddTaskToCardActionPayload {
	tasksList: string[];
	level: number;
}

export interface AddTaskToCardActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.ADD_TASK_TO_CARD;
	payload: AddTaskToCardActionPayload;
}

//tasks
export interface SetTasksActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TASKS;
	payload: TaskInterface[];
}

export interface AddTaskActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.ADD_TASK;
	payload: TaskInterface;
}

export interface ChangeTaskActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.CHANGE_TASK;
	payload: TaskInterface;
}

export interface DeleteTaskActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.DELETE_TASK;
	payload: string;
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
