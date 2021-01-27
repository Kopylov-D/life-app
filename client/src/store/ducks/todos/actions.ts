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

		function findParents() {
			const { tasks, targets, subtasks } = getState().todos;
		}
	};
}

export function fetchAddTask(
	task: TaskInterface
	// name: string,
	// target?: string,
	// notes?: string,
	// color?: string,
	// priority?: string,
	// subtask?: string,
	// level?: number
): ThunkType {
	return async dispatch => {
		try {
			const { data } = await todosApi.addTask(
				{ ...task }

				// name,
				// target,
				// notes,
				// color,
				// priority,
				// subtask,
				// level
			);
			dispatch(addTask(data));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

function needCheck() {}

//initialId = task.id
//

function findParents(task: any, tasks: any, subtasks: any, isDone: any) {
	if (task?.isDone !== isDone) {
		subtasks.map((sub: any) => {
			if (sub._id === task?.subtask) {
				sub.isDone = !task.isDone;
			}
			return sub;
		});
	}
}

export function updateTask(
	task: TaskInterface
	// id: string,
	// isDone?: boolean,
	// name?: string,
	// target?: string,
	// notes?: string,
	// color?: string,
	// priority?: string
): ThunkType {
	return async (dispatch, getState) => {
		const state = getState().todos;
		let { tasks, targets, subtasks } = getState().todos;

		// const tasksArr = tasks.map(item => {
		// 	if (item._id === id) {
		// 		item.isDone = isDone?
		// 		item.name = name?
		// 		item.target = target?
		// 		item.notes = notes?
		// 		item.color = color?
		// 		// item.priority = priority
		// 	}
		// 	return item
		// })

		function findParents(initialId: any, isDone: boolean) {
			let newTaskId = '';
			const currentTask = tasks.find(item => item._id === initialId);

			// if (currentTask?.isDone !== isDone) {
				subtasks = subtasks.map((sub: any) => {
					if (sub._id === currentTask?.subtask) {
						sub.isDone = isDone;
						newTaskId = sub.task;
					}
					return sub;
				});
			// }

			let newTask = tasks.find(item => item._id === newTaskId);

			// function hasUncheck(arr: SubtaskInterface[]) {
			// 	arr.filter(
			// 		item => item.task === newTask?._id && item.isDone === newTask.isDone
			// 	).length;
			// }

			if (newTask) {
				let hasUncheck = subtasks.filter(
					item => item.task === newTask?._id && item.isDone === newTask.isDone
				).length;
				
				if (hasUncheck) {
					return
				}
				let nextId: string | undefined = ''
				tasks = tasks.map(item => {
					if (item._id === newTask?._id) {
						item.isDone = isDone
						nextId = item._id
					}
					return item
				})
				findParents(nextId, isDone)
				// hasUncheck : return ? findParents()
			}
		}



		findParents(task._id, task.isDone)

		// let task1 = tasks.find(item => item._id === task!._id);

		// console.log(task1);

		// let newTaskId = '';

		// if (task1?.isDone !== task.isDone) {
		// 	subtasks.map(sub => {
		// 		if (sub._id === task1?.subtask) {
		// 			sub.isDone = !task1.isDone;
		// 			newTaskId = sub.task;
		// 		}
		// 		return sub;
		// 	});
		// }

		// let newTask = tasks.find(item => item._id === newTaskId);

		// if (newTask) {
		// 	let hasUncheck = subtasks.filter(
		// 		item => item.task === newTask?._id && item.isDone !== newTask.isDone
		// 	).length;

		// }

		// if ()


		dispatch(syncState({ ...state, subtasks: subtasks }));

		try {
			const { data } = await todosApi.updateTask(
				// id,
				// isDone,
				// name,
				// target,
				// notes,
				// color,
				// priority
				task
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
