import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import {
	CardInterface,
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
} from './contracts/state';

export const selectTargets = (state: RootState): TargetInterface[] => state.todos.targets;

export const selectSubtasks = (state: RootState): SubtaskInterface[] =>
	state.todos.subtasks;

export const selectTasks = (state: RootState): TaskInterface[] => state.todos.tasks;

export const selectCards = (state: RootState): CardInterface[] => state.todos.cards;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
	state.todos.loadingStatus;

export const selectCardsNumber = (state: RootState): number => state.todos.cards.length;

export const selectTasksList = (state: RootState) => {
	const tasks = state.todos.tasks;

	const items = tasks.map(task => {
		// if (!task.subtask && !task.level) {
			return {
				id: task._id,
				value: task.name,
			};
		// }
	});

	return items;
};

export const selectTargetsList = (state: RootState) => {
	const targets = state.todos.targets;

	const items = targets.map(target => {
		return {
			id: target._id,
			value: target.name,
		};
	});

	return items;
};


