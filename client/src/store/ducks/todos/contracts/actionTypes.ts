import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { TargetInterface, TaskInterface } from '../types';

export enum TodosActionTypes {
	// GET_TARGETS = 'GET_TARGETS',
	SET_TARGETS = 'SET_TARGETS',
	SET_LOADING_STATUS = 'SET_LOADING',
	SET_TASKS = 'SET_TASKS'
}

// export interface GetTargetsActionInterface extends Action<TodosActionTypes> {
// 	type: TodosActionTypes.GET_TARGETS;
// 	payload: TargetInterface[];
// }

export interface SetTargetsActionInterface extends Action<TodosActionTypes> {
  type: TodosActionTypes.SET_TARGETS
  payload: TargetInterface[]
}

export interface SetLoadingStatusActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_LOADING_STATUS;
	payload: LoadingStatus;
}

export interface SetTasksActionInterface extends Action<TodosActionTypes> {
	type: TodosActionTypes.SET_TASKS
	payload: TaskInterface[]
}
