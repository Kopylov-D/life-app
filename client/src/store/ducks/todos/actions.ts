import { ThunkAction } from 'redux-thunk';
// import RefreshIcon from '../../../components/UI/Icons/RefreshIcon';
import { todosApi } from '../../../services/api/todosApi';
// import { AlertActions, showAlert } from '../../middleaware/alert.middleware';
import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import { showAlert } from '../common/actions';
import { CommonActions } from '../common/contracts/actionTypes';
import {
	addCard,
	addSubtask,
	addTarget,
	addTask,
	changeCard,
	changeSubtask,
	changeTarget,
	changeTask,
	deleteCard,
	deleteSubtask,
	deleteTarget,
	deleteTask,
	// setAlert,
	setError,
	setLoadingStatus,
	setTargets,
	setTasks,
	setTasksToCard,
	setTodosData,
	syncState,
	TodosActions,
} from './actionCreators';
import {
	SubtaskInterface,
	TargetInterface,
	TaskInterface,
	TodosState,
} from './contracts/state';

function findChildsToDelete(initialId: string, todos: TodosState) {
	const tasksFoDelete: string[] = [];
	const subtasksFoDelete: string[] = [];
	let { subtasks, tasks } = todos;

	findChilds(initialId);

	function findChilds(id: string) {
		subtasks = subtasks.filter(subtask => {
			if (subtask.task === id) {
				let subId = subtask._id;
				let nextInitialId = '';

				subtasksFoDelete.push(subId);

				tasks = tasks.filter(task => {
					if (task.subtask === subId) {
						nextInitialId = task._id;
						tasksFoDelete.push(nextInitialId);
					}
					return task.subtask !== subId;
				});

				findChilds(nextInitialId);
			}

			return subtask.task !== id;
		});
	}

	return { tasksFoDelete, subtasksFoDelete, subtasks, tasks };
}

type ThunkType = ThunkAction<
	Promise<void>,
	RootState,
	unknown,
	TodosActions | CommonActions
>;

export function getTodosData(): ThunkType {
	return async dispatch => {
		dispatch(setLoadingStatus(LoadingStatus.LOADING));
		try {
			const { data } = await todosApi.getTodosData();
			dispatch(setTodosData(data));
			dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
		} catch (e) {
			console.log(e);
			dispatch(showAlert({ text: e.message }));
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
		// finally {
		// 	dispatch(setLoadingStatus(LoadingStatus.LOADED))
		// }
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
	return async (dispatch, getState) => {
		dispatch(setTasksToCard({ tasksList, level }));
		dispatch(syncData(getState().todos));
	};
}

export function syncData(todos: TodosState): ThunkType {
	return async (dispatch, getState) => {
		try {
			// const todos = getState().todos;
			await todosApi.syncData(todos);
		} catch (e) {
			console.log(e);
			dispatch(
				showAlert({
					text: 'Синхронизация не удалась. Повторите вручную',
					type: 'error',
					action: 'sync',
				})
			);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function syncDataWithout(): ThunkType {
	return async (dispatch, getState) => {
		try {
			const todos = getState().todos;
			await todosApi.syncData(todos);
		} catch (e) {
			console.log(e);
			dispatch(setError(e));
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddTask(task: TaskInterface): ThunkType {
	return async (dispatch, getState) => {
		const tasks = getState().todos.tasks;

		//TODO

		if (tasks.find(item => item.subtask === task.subtask && task.subtask !== undefined))
			return;
		try {
			const { data } = await todosApi.addTask(task);
			dispatch(addTask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function decomposeSubtask(subtask: SubtaskInterface): ThunkType {
	return async (dispatch, getState) => {
		try {
			const state = getState().todos;
			let { tasks } = state;
			let parentTask = tasks.find(task => task._id === subtask.task);
			const childTask = tasks.find(task => task.subtask === subtask._id);

			if (subtask.isDone || childTask) {
				dispatch(
					showAlert({
						text: 'Задача уже добавлена',
						type: 'warning',
						delay: 2000,
					})
				);
				return;
			}

			if (parentTask) {
				dispatch(updateTask({ ...parentTask, isDone: false }, false));
			}

			const task: TaskInterface = {
				_id: '',
				date: new Date(),
				isDone: false,
				level: subtask.level - 1,
				subtask: subtask._id,
				name: subtask.name,
				notes: '',
				target: subtask.target,
				color: subtask.color,
			};

			dispatch(fetchAddTask(task));

			// const { data } = await todosApi.updateTask(task);
			// dispatch(changeTask(data));

		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function updateTask(
	task: TaskInterface,
	needCheckChilds: boolean = true
): ThunkType {
	return async (dispatch, getState) => {
		const state = getState().todos;
		let { tasks, subtasks } = state;

		task.subtask && checkParents(task.subtask, task.isDone);
		needCheckChilds && checkChilds(task._id, task.isDone);

		if (task.subtask) {
			subtasks = subtasks.map(subtask => {
				if (subtask._id === task.subtask) {
					subtask.name = task.name;
				}
				return subtask;
			});
		}

		function checkParents(initialId: string | undefined, isDone: boolean) {
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

				checkParents(initialId, isDone);
			} else return;
		}

		function checkChilds(initialId: string, isDone: boolean) {
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

					checkChilds(nextInitialId, isDone);
				}

				return subtask;
			});
		}

		try {
			dispatch(syncState({ ...state, subtasks, tasks }));
			dispatch(syncData({ ...state, subtasks, tasks }));
			dispatch(changeTask(task));
			const { data } = await todosApi.updateTask(task);
			//возвращает обновленную задачу
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchDeleteTask(id: string, isBacklogTask: boolean = false): ThunkType {
	return async (dispatch, getState) => {
		try {
			const state = getState().todos;
			const task = state.tasks.find(task => task._id === id);

			// if (task.)
			const { tasksFoDelete, subtasksFoDelete, subtasks, tasks } = findChildsToDelete(
				id,
				state
			);

			dispatch(syncState({ ...state, subtasks, tasks }));

			if (isBacklogTask) {
				dispatch(deleteTask(id));
				await todosApi.deleteTask(id);
			}

			if (task!.subtask) {
				dispatch(deleteTask(id));
				await todosApi.deleteTask(id);
			} else {
				dispatch(updateTask({ ...task!, level: 0 }, false));
			}

			await todosApi.multiplyDelete(tasksFoDelete, subtasksFoDelete);
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

export function updateTarget(target: TargetInterface): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.updateTarget(target);
			dispatch(changeTarget(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchAddTarget(target: TargetInterface): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addTarget(target);
			dispatch(addTarget(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function fetchDeleteSubtask(id: string): ThunkType {
	return async (dispatch, getState) => {
		const state = getState().todos;
		const childTaskForDelete = state.tasks.find(task => task.subtask === id)?._id;

		try {
			if (childTaskForDelete) {
				const { tasksFoDelete, subtasksFoDelete, subtasks, tasks } = findChildsToDelete(
					childTaskForDelete,
					state
				);
				subtasksFoDelete.push(id);
				tasksFoDelete.push(childTaskForDelete);
				dispatch(syncState({ ...state, subtasks, tasks }));
				dispatch(deleteTask(childTaskForDelete));
				await todosApi.multiplyDelete(tasksFoDelete, subtasksFoDelete);
			}
			dispatch(deleteSubtask(id));
			await todosApi.deleteSubtask(id);
			//TOOD
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function updateSubtask(subtask: SubtaskInterface): ThunkType {
	return async (dispatch, getState) => {
		try {
			dispatch(changeSubtask(subtask));
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
	subtask: SubtaskInterface
	// name: string,
	// task: string,
	// level: number,
	// target: string | null = null,
	// color: string
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addSubtask(subtask);
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
	return async (dispatch, getState) => {
		const state = getState().todos;
		let { subtasks, tasks } = state;

		const childTaskForDelete = tasks.find(task => task.subtask === id)?._id;

		const card = state.cards.find(card => card._id === id);
		const tasksIdForDelete: string[] = [];

		tasks = tasks.map(task => {
			if (task.level === card?.level) {
				tasksIdForDelete.push(task._id);
				task.level = 0;
			}
			return task;
		});

		const tasksFoDelete: string[] = [];
		const subtasksFoDelete: string[] = [];

		tasksIdForDelete.forEach(item => {
			if (item) {
				// tasksFoDelete.push(item);
				findChildsToDelete(item, state);
			}
		});

		function findChildsToDelete(initialId: string, todos: TodosState) {
			findChilds(initialId);

			function findChilds(id: string) {
				subtasks = subtasks.filter(subtask => {
					if (subtask.task === id) {
						let subId = subtask._id;
						let nextInitialId = '';

						subtasksFoDelete.push(subId);

						tasks = tasks.filter(task => {
							if (task.subtask === subId) {
								nextInitialId = task._id;
								tasksFoDelete.push(nextInitialId);
							}
							return task.subtask !== subId;
						});

						findChilds(nextInitialId);
					}

					return subtask.task !== id;
				});
			}

			return { tasksFoDelete, subtasksFoDelete, subtasks, tasks };
		}

		try {
			dispatch(syncState({ ...state, subtasks, tasks }));
			dispatch(deleteCard(id));
			dispatch(syncData({ ...state, subtasks, tasks }));
			// dispatch(deleteTask(childTaskForDelete));
			await todosApi.multiplyDelete(tasksFoDelete, subtasksFoDelete);

			// dispatch(deleteSubtask(id));
			// await todosApi.deleteSubtask(id);
			await todosApi.deleteCard(id);
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}
