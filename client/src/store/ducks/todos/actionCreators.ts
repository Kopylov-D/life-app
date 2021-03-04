// import { AlertInterface } from '../../middleaware/alert.middleware';
import { AxiosError } from 'axios';
import { LoadingStatus } from '../../types';
import {
	AddCardActionInterface,
	AddSubtaskActionInterface,
	AddTargetActionInterface,
	AddTaskActionInterface,
	AddTaskToCardActionInterface,
	AddTaskToCardActionPayload,
	ChangeCardActionInterface,
	ChangeSubtaskActionInterface,
	ChangeTargetActionInterface,
	ChangeTaskActionInterface,
	DeleteCardActionInterface,
	DeleteSubtaskActionInterface,
	DeleteTargetActionInterface,
	DeleteTaskActionInterface,
	SetErrorActionInterface,
	SetLoadingStatusActionInterface,
	SetSortKeyActionInterface,
	SetSortOrderActionInterface,
	SetTargetsActionInterface,
	SetTasksActionInterface,
	SetTodosDataActionInterface,
	SetVisibilityFilterActionInterface,
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
	| SetErrorActionInterface
	| SetTasksActionInterface
	| AddTaskActionInterface
	| ChangeTaskActionInterface
	| DeleteTaskActionInterface
	| SetTodosDataActionInterface
	| AddTargetActionInterface
	| AddSubtaskActionInterface
	| ChangeSubtaskActionInterface
	| DeleteSubtaskActionInterface
	| AddCardActionInterface
	| ChangeCardActionInterface
	| DeleteCardActionInterface
	| DeleteTargetActionInterface
	| ChangeTargetActionInterface
	| AddTaskToCardActionInterface
	| SyncStateActionInterface
	| SetVisibilityFilterActionInterface
	| SetSortKeyActionInterface
	| SetSortOrderActionInterface;

export const setLoadingStatus = (
	payload: LoadingStatus
): SetLoadingStatusActionInterface => ({
	type: TodosActionTypes.SET_LOADING_STATUS,
	payload,
});

export const SetVisibilityFilter = (
	payload: TodosState['visibilityFilter']
): SetVisibilityFilterActionInterface => ({
	type: TodosActionTypes.SET_VISIBILITY_FILTER,
	payload,
});

export const SetSortOrder = (
	payload: TodosState['sortOrder']
): SetSortOrderActionInterface => ({
	type: TodosActionTypes.SET_SORT_ORDER,
	payload,
});

export const SetSortKey = (
	payload: TodosState['sortKey']
): SetSortKeyActionInterface => ({
	type: TodosActionTypes.SET_SORT_KEY,
	payload,
});

export const setError = (payload: AxiosError): SetErrorActionInterface => ({
	type: TodosActionTypes.SET_ERROR,
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

export const changeSubtask = (
	payload: SubtaskInterface
): ChangeSubtaskActionInterface => ({
	type: TodosActionTypes.CHANGE_SUBTASK,
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
