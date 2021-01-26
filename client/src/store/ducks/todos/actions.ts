import { ThunkAction } from 'redux-thunk';
import { todosApi } from '../../../services/api/todosApi';
import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import {
	addCard,
	addSubtask,
	addTarget,
	addTask,
	changeCard,
	changeTarget,
	changeTask,
	deleteCard,
	deleteTarget,
	deleteTask,
	setLoadingStatus,
	setTargets,
	setTasks,
	setTasksToCard,
	setTodosData,
	TodosActions,
} from './actionCreators';
import { TaskInterface } from './contracts/state';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, TodosActions>;

export function getTodosData(): ThunkType {
	return async dispatch => {
		dispatch(setLoadingStatus(LoadingStatus.LOADING));
		try {
			const { data } = await todosApi.getTodosData();
			dispatch(setTodosData(data));
			dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function getTasks(): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.getTasks();
			dispatch(setTasks(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function addTasksToCard(tasksList: string[], level: number): ThunkType {
	return async dispatch => {
		dispatch(setTasksToCard({ tasksList, level }));
		console.log('dispatch');

		// try {
		// 	const state = getState();
		// 	const data = await todosApi.syncData(state.todos.tasks);
		// 	console.log(data);

		// 	// dispatch(setTasks(data));
		// } catch (e) {
		// 	console.log(e);
		// 	dispatch(setLoadingStatus(LoadingStatus.ERROR));
		// }

		dispatch(syncData());
	};
}

export function syncData(): ThunkType {
	return async (dispatch, getState) => {
		try {
			const state = getState();
			const data = await todosApi.syncData(state.todos.tasks);
			console.log(data);

			// dispatch(setTasks(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddTask(
	name: string,
	target?: string,
	notes?: string,
	color?: string,
	priority?: string
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addTask(name, target, notes, color, priority);
			dispatch(addTask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function updateTask(
	id: string,
	isDone?: boolean,
	name?: string,
	target?: string,
	notes?: string,
	color?: string,
	priority?: string
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.updateTask(
				id,
				isDone,
				name,
				target,
				notes,
				color,
				priority
			);
			dispatch(changeTask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchDeleteTask(id: string): ThunkType {
	return async dispatch => {
		try {
			await todosApi.deleteTask(id);
			dispatch(deleteTask(id));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function getTargets(): ThunkType {
	return async dispatch => {
		try {
			const targets = await todosApi.fetchTargets();
			dispatch(setTargets(targets));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function updateTarget(
	id: string,
	name?: string,
	notes?: string,
	isDone?: boolean,
	color?: string
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.updateTarget(id, name, isDone, notes, color);
			dispatch(changeTarget(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddTarget(name: string): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addTarget(name);
			dispatch(addTarget(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchDeleteTarget(id: string): ThunkType {
	return async dispatch => {
		try {
			await todosApi.deleteTarget(id);
			dispatch(deleteTarget(id));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddSubtask(
	name: string,
	task: string,
	target: string | null = null
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addSubtask(name, task, target);
			dispatch(addSubtask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddCard(level: number): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addCard(level);
			dispatch(addCard(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function updateCard(id: string, name: string): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.updateCard(id, name);
			dispatch(changeCard(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchDeleteCard(id: string): ThunkType {
	return async dispatch => {
		try {
			await todosApi.deleteCard(id);
			dispatch(deleteCard(id));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}
