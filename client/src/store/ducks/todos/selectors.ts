import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import { TargetInterface, TaskInterface } from './contracts/state';

export const selectTargets = (state: RootState): TargetInterface[] => state.todos.targets;

export const selectTasks = (state: RootState): TaskInterface[] => state.todos.tasks;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
	state.todos.loadingStatus;


