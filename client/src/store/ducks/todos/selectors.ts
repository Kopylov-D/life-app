import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import { TargetInterface } from './types';

export const selectTargets = (state: RootState): TargetInterface[] => state.todos.targets;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
	state.todos.loadingStatus;
