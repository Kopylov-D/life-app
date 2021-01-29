import { LoadingStatus } from '../../types';
import {
	AddCardActionInterface,
	AddSubtaskActionInterface,
	AddTargetActionInterface,
	AddTaskActionInterface,
	AddTaskToCardActionInterface,
	AddTaskToCardActionPayload,
	ChangeCardActionInterface,
	ChangeTargetActionInterface,
	ChangeTaskActionInterface,
	DeleteCardActionInterface,
	DeleteSubtaskActionInterface,
	DeleteTargetActionInterface,
	DeleteTaskActionInterface,
	SetLoadingStatusActionInterface,
	SetTargetsActionInterface,
	SetTasksActionInterface,
	SetTodosDataActionInterface,
	SyncStateActionInterface,
	TodosActionTypes,
} from './contracts/actionTypes';
import {
	CardInterface,
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
	TodosDataInterface,
	TodosState,
} from './contracts/state';

export type TodosActions =
	| SetTargetsActionInterface
	| SetLoadingStatusActionInterface
	| SetTasksActionInterface
	| AddTaskActionInterface
	| ChangeTaskActionInterface
	| DeleteTaskActionInterface
	| SetTodosDataActionInterface
	| AddTargetActionInterface
	| AddSubtaskActionInterface
	| DeleteSubtaskActionInterface
	| AddCardActionInterface
	| ChangeCardActionInterface
	| DeleteCardActionInterface
	| DeleteTargetActionInterface
	| ChangeTargetActionInterface
	| AddTaskToCardActionInterface
	| SyncStateActionInterface;

export const setLoadingStatus = (
	payload: LoadingStatus
): SetLoadingStatusActionInterface => ({
	type: TodosActionTypes.SET_LOADING_STATUS,
	payload,
});

export const syncState = (payload: TodosState): SyncStateActionInterface => ({
	type: TodosActionTypes.SYNC_STATE,
	payload,
});

export const setTodosData = (
	payload: TodosDataInterface
): SetTodosDataActionInterface => ({
	type: TodosActionTypes.SET_TODOS_DATA,
	payload,
});

export const setTasksToCard = (
	payload: AddTaskToCardActionPayload
): AddTaskToCardActionInterface => ({
	type: TodosActionTypes.ADD_TASK_TO_CARD,
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

export const changeTask = (payload: TaskInterface): ChangeTaskActionInterface => ({
	type: TodosActionTypes.CHANGE_TASK,
	payload,
});

export const deleteTask = (payload: string): DeleteTaskActionInterface => ({
	type: TodosActionTypes.DELETE_TASK,
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

export const deleteSubtask = (payload: string): DeleteSubtaskActionInterface => ({
	type: TodosActionTypes.DELETE_SUBTASK,
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
