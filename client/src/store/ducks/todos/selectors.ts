import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import { CardInterface, TargetInterface, TaskInterface } from './contracts/state';

export const selectTargets = (state: RootState): TargetInterface[] => state.todos.targets;

export const selectTasks = (state: RootState): TaskInterface[] => state.todos.tasks;

export const selectCards = (state: RootState): CardInterface[] => state.todos.cards;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
	state.todos.loadingStatus;

export const selectCardsNumber = (state: RootState): number => state.todos.cards.length;
