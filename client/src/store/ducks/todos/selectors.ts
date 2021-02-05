import { formatDate } from '../../../services/utils/dateUtils';
import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import {
	CardInterface,
	ColorInterface,
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
} from './contracts/state';

export const selectTargets = (state: RootState): TargetInterface[] => state.todos.targets;

export const selectSubtasks = (state: RootState): SubtaskInterface[] =>
	state.todos.subtasks;

export const selectTasks = (state: RootState): TaskInterface[] => state.todos.tasks.filter(task => task.inArchive === false);

export const selectColors = (state: RootState): ColorInterface[] => state.todos.colors;

export const selectCards = (state: RootState): CardInterface[] => state.todos.cards;

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
	state.todos.loadingStatus;

export const selectCardsNumber = (state: RootState): number => state.todos.cards.length;

export const selectTasksList = (state: RootState) => {
	const tasks = state.todos.tasks;

	const items = tasks.map(task => {
		return {
			id: task._id,
			value: task.name,
		};
	});

	return items;
};

export const selectTargetsList = (state: RootState) => {
	const targets = state.todos.targets;

	const items = targets.map(target => {
		return {
			id: target._id,
			value: target.name,
			color: target.color,
		};
	});

	return items;
};

export const selectIssues = (state: RootState): TaskInterface[] => {
	const tasks = state.todos.tasks;

	// const items: TaskInterface[] = []

	// tasks.map(task => {
	// 	if (task.inArchive === true || task.isDone === false) {
	// 		if (task.expiresIn) task.expiresIn = formatDate(task.expiresIn)
	// 	}
	// })

	return tasks.filter(task => task.inArchive === true || task.isDone === false);
};
