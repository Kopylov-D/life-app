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
		default:
			return {
				...state,
			};
	}
};
