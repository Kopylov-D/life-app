import { ThunkAction } from 'redux-thunk';
import { api } from '../../../services/api';
import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import { setLoadingStatus, setTargets, setTasks, TodosActions } from './actionCreators';
import { TodosActionTypes } from './contracts/actionTypes';

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, TodosActions>;

export function getTargets(): ThunkType {
	return async dispatch => {
		dispatch(setLoadingStatus(LoadingStatus.LOADING));
		try {
			const targets = await api.fetchTargets();
			dispatch(setTargets(targets));
			dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function getTasks(): ThunkType {
	return async dispatch => {
		dispatch(setLoadingStatus(LoadingStatus.LOADING));
		try {
			const tasks = await api.fetchTasks();
			dispatch(setTasks(tasks));
		} catch (e) {
			console.log(e);
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}
