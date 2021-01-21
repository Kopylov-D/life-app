import { LoadingStatus } from '../../types';
import {
	AddCardActionInterface,
	AddSubtaskActionInterface,
	AddTargetActionInterface,
	ChangeCardActionInterface,
	SetLoadingStatusActionInterface,
	SetTargetsActionInterface,
	SetTasksActionInterface,
	SetTodosDataActionInterface,
	TodosActionTypes,
} from './contracts/actionTypes';
import {
	CardInterface,
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
	TodosDataInterface,
} from './contracts/state';

export type TodosActions =
	| SetTargetsActionInterface
	| SetLoadingStatusActionInterface
	| SetTasksActionInterface
	| SetTodosDataActionInterface
	| AddTargetActionInterface
	| AddSubtaskActionInterface
	| AddCardActionInterface 
	| ChangeCardActionInterface 

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

export const addSubtask = (payload: SubtaskInterface): AddSubtaskActionInterface => ({
	type: TodosActionTypes.ADD_SUBTASK,
	payload,
});

export const addCard = (payload: CardInterface): AddCardActionInterface => ({
	type: TodosActionTypes.ADD_CARD,
	payload,
});

export const changeCard = (payload: CardInterface): ChangeCardActionInterface => ({
	type: TodosActionTypes.CHANGE_CARD,
	payload,
});
