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
	syncState,
	TodosActions,
} from './actionCreators';
import { SubtaskInterface, TaskInterface } from './contracts/state';

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
		dispatch(syncData());
	};
}

export function syncData(): ThunkType {
	return async (dispatch, getState) => {
		try {
			const todos = getState().todos;
			await todosApi.syncData(todos);
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddTask(task: TaskInterface): ThunkType {
	return async (dispatch, getState) => {
		const tasks = getState().todos.tasks;

		//TODO

		// if (tasks.find(item => item.subtask === task.subtask && typeof task.subtask !== undefined )) return;

		try {
			const { data } = await todosApi.addTask(task);
			dispatch(addTask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function updateTask(task: TaskInterface): ThunkType {
	return async (dispatch, getState) => {
		const state = getState().todos;
		let { tasks, subtasks } = state;

		findParents(task.subtask, task.isDone);
		findChilds(task._id, task.isDone);

		dispatch(syncState({ ...state, subtasks, tasks }));

		function findParents(initialId: string | undefined, isDone: boolean) {
			if (initialId) {
				subtasks = subtasks.map(subtask => {
					if (subtask._id === initialId) {
						subtask.isDone = isDone;
						initialId = subtask.task;
					}
					return subtask;
				});

				let hasUncheck = subtasks.filter(
					subtask => subtask.task === initialId && subtask.isDone !== true
				).length;

				if (hasUncheck) isDone = false;

				tasks = tasks.map(task => {
					if (task._id === initialId) {
						task.isDone = isDone;
						initialId = task.subtask;
					}
					return task;
				});

				findParents(initialId, isDone);
			} else return;
		}

		function findChilds(initialId: string, isDone: boolean) {
			subtasks = subtasks.map(subtask => {
				if (subtask.task === initialId && subtask.isDone !== isDone) {
					subtask.isDone = isDone;

					let subId = subtask._id;
					let nextInitialId = '';

					tasks = tasks.map(task => {
						if (task.subtask === subId) {
							task.isDone = isDone;
							nextInitialId = task._id;
						}
						return task;
					});

					findChilds(nextInitialId, isDone);
				}

				return subtask;
			});
		}

		try {
			const { data } = await todosApi.updateTask(task);
			dispatch(changeTask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchDeleteTask(id: string): ThunkType {
	return async (dispatch, getState) => {
		const state = getState().todos;
		let { tasks, subtasks } = state;

		findChildsToDelete(id);
		dispatch(syncState({ ...state, subtasks, tasks }));

		function findChildsToDelete(id: string) {
			subtasks = subtasks.filter(subtask => {
				if (subtask.task === id) {
					let subId = subtask._id;
					let nextInitialId = '';

					tasks = tasks.filter(task => {
						if (task.subtask === subId) {
							nextInitialId = task._id;
						}
						return task.subtask !== subId;
					});

					findChildsToDelete(nextInitialId);
				}

				return subtask.task !== id;
			});
		}

		try {
			dispatch(deleteTask(id));
			await todosApi.deleteTask(id);
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
	level: number,
	target: string | null = null
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addSubtask(name, task, level, target);
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
