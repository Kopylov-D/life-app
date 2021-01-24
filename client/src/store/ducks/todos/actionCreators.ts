import { LoadingStatus } from '../../types';
import {
	AddCardActionInterface,
	AddSubtaskActionInterface,
	AddTargetActionInterface,
	AddTaskActionInterface,
	ChangeCardActionInterface,
	ChangeTargetActionInterface,
	DeleteCardActionInterface,
	DeleteTargetActionInterface,
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
	| DeleteCardActionInterface
	| DeleteTargetActionInterface
	| AddTaskActionInterface
	| ChangeTargetActionInterface;

export const setLoadingStatus = (
	payload: LoadingStatus
): SetLoadingStatusActionInterface => ({
	type: TodosActionTypes.SET_LOADING_STATUS,
	payload,
});

export const setTodosData = (
	payload: TodosDataInterface
): SetTodosDataActionInterface => ({
	type: TodosActionTypes.SET_TODOS_DATA,
	payload,
});

/* tasks **/

export const setTasks = (payload: TaskInterface[]): SetTasksActionInterface => ({
	type: TodosActionTypes.SET_TASKS,
	payload,
});

export const addTask = (payload: TaskInterface): AddTaskActionInterface => ({
	type: TodosActionTypes.ADD_TASK,
	payload,
});

/* targets **/

export const addTarget = (payload: TargetInterface): AddTargetActionInterface => ({
	type: TodosActionTypes.ADD_TARGET,
	payload,
});

export const setTargets = (payload: TargetInterface[]): SetTargetsActionInterface => ({
	type: TodosActionTypes.SET_TARGETS,
	payload,
});

export const changeTarget = (payload: TargetInterface): ChangeTargetActionInterface => ({
	type: TodosActionTypes.CHANGE_TARGET,
	payload,
});

export const deleteTarget = (payload: string): DeleteTargetActionInterface => ({
	type: TodosActionTypes.DELETE_TARGET,
	payload,
});

/* subtask **/

export const addSubtask = (payload: SubtaskInterface): AddSubtaskActionInterface => ({
	type: TodosActionTypes.ADD_SUBTASK,
	payload,
});

/* cards **/

export const addCard = (payload: CardInterface): AddCardActionInterface => ({
	type: TodosActionTypes.ADD_CARD,
	payload,
});

export const changeCard = (payload: CardInterface): ChangeCardActionInterface => ({
	type: TodosActionTypes.CHANGE_CARD,
	payload,
});

export const deleteCard = (payload: string): DeleteCardActionInterface => ({
	type: TodosActionTypes.DELETE_CARD,
	payload,
});
