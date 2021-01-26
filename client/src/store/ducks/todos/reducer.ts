import { act } from '@testing-library/react';
import { LoadingStatus } from '../../types';
import { TodosActions } from './actionCreators';
import { TodosActionTypes } from './contracts/actionTypes';
import { TodosState } from './contracts/state';

const initialState: TodosState = {
	tasks: [],
	subtasks: [],
	targets: [],
	colors: [],
	cards: [],
	loadingStatus: LoadingStatus.LOADING,
};

export const todosReducer = (state = initialState, action: TodosActions): TodosState => {
	switch (action.type) {
		case TodosActionTypes.SET_TODOS_DATA:
			return {
				...state,
				tasks: action.payload.tasks,
				subtasks: action.payload.subtasks,
				targets: action.payload.targets,
				colors: action.payload.colors,
				cards: action.payload.cards,
			};
		case TodosActionTypes.SET_TARGETS:
			return {
				...state,
				targets: action.payload,
			};
		case TodosActionTypes.ADD_TASK_TO_CARD:
			const selectTasks = state.tasks
			selectTasks.map(task => {
				if (action.payload.tasksList.includes(task._id)) {
					task.level = action.payload.level
				}
				return task
			})
			return {
				...state,
				tasks: selectTasks
			};
		case TodosActionTypes.SET_LOADING_STATUS:
			return {
				...state,
				loadingStatus: action.payload,
			};
		case TodosActionTypes.SET_TASKS:
			return {
				...state,
				tasks: action.payload,
			};
		case TodosActionTypes.ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		case TodosActionTypes.DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter(task => task._id !== action.payload),
			};
		case TodosActionTypes.CHANGE_TASK:
			const tasks = state.tasks.map(task => {
				if (task._id === action.payload._id) {
					return action.payload;
				}
				return task;
			});
			return {
				...state,
				tasks,
			};
		case TodosActionTypes.ADD_TARGET:
			return {
				...state,
				targets: [...state.targets, action.payload],
			};
		case TodosActionTypes.ADD_SUBTASK:
			return {
				...state,
				subtasks: [...state.subtasks, action.payload],
			};
		case TodosActionTypes.ADD_CARD:
			return {
				...state,
				cards: [...state.cards, action.payload],
			};
		case TodosActionTypes.CHANGE_CARD:
			const cards = state.cards.map(card => {
				if (card._id === action.payload._id) {
					return action.payload;
				}
				return card;
			});

			return {
				...state,
				cards,
			};
		case TodosActionTypes.DELETE_CARD:
			return {
				...state,
				cards: state.cards.filter(item => item._id !== action.payload),
			};
		case TodosActionTypes.DELETE_TARGET:
			return {
				...state,
				targets: state.targets.filter(item => item._id !== action.payload),
			};
		case TodosActionTypes.CHANGE_TARGET:
			const targets = state.targets.map(target => {
				if (target._id === action.payload._id) {
					return action.payload;
				}
				return target;
			});

			return {
				...state,
				targets,
			};
		default:
			return state;
	}
};
