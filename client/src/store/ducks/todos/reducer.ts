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
		case TodosActionTypes.ADD_TARGET:
			return {
				...state,
				targets: [...state.targets, action.payload],
			};
		default:
			return state;
	}
};
