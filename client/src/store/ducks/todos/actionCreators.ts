import { LoadingStatus } from '../../types';
import {
	AddTargetActionInterface,
	SetLoadingStatusActionInterface,
	SetTargetsActionInterface,
	SetTasksActionInterface,
	SetTodosDataActionInterface,
	TodosActionTypes,
} from './contracts/actionTypes';
import { TargetInterface, TaskInterface, TodosDataInterface } from './contracts/state';

export type TodosActions =
	| SetTargetsActionInterface
	| SetLoadingStatusActionInterface
	| SetTasksActionInterface
	| SetTodosDataActionInterface
	| AddTargetActionInterface;

export const setTargets = (payload: TargetInterface[]): SetTargetsActionInterface => ({
	type: TodosActionTypes.SET_TARGETS,
	payload,
});

export const setLoadingStatus = (
	payload: LoadingStatus
): SetLoadingStatusActionInterface => ({
	type: TodosActionTypes.SET_LOADING_STATUS,
	payload,
});

export const setTasks = (payload: TaskInterface[]): SetTasksActionInterface => ({
	type: TodosActionTypes.SET_TASKS,
	payload,
});

export const setTodosData = (
	payload: TodosDataInterface
): SetTodosDataActionInterface => ({
	type: TodosActionTypes.SET_TODOS_DATA,
	payload,
});

export const addTarget = (payload: TargetInterface): AddTargetActionInterface => ({
	type: TodosActionTypes.ADD_TARGET,
	payload,
});
