import { LoadingStatus } from '../../types';
import { SetLoadingStatusActionInterface, SetTargetsActionInterface, SetTasksActionInterface, TodosActionTypes } from './contracts/actionTypes';
import { TargetInterface, TaskInterface } from './types';

export type TodosActions = SetTargetsActionInterface | SetLoadingStatusActionInterface | SetTasksActionInterface

export const setTargets = (payload: TargetInterface[]): SetTargetsActionInterface => ({
  type: TodosActionTypes.SET_TARGETS, 
  payload,
});

export const setLoadingStatus = (payload: LoadingStatus): SetLoadingStatusActionInterface => ({
  type: TodosActionTypes.SET_LOADING_STATUS,
  payload
})

export const setTasks = (payload: TaskInterface[]): SetTasksActionInterface => ({
  type: TodosActionTypes.SET_TASKS,
  payload
})


