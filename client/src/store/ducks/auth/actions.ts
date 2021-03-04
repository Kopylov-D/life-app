import { ThunkAction } from 'redux-thunk';
import { authApi } from '../../../services/api/authApi';
import { getAuthData } from '../../../services/api/index';
import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';
import { showAlert } from '../common/actions';
import { CommonActions } from '../common/contracts/actionTypes';
import { AuthActions, setAuthData, setLoadingStatus, setLogout } from './actionCreators';
import { AuthDataInterface } from './contracts/state';

type ThunkType = ThunkAction<
	Promise<void>,
	RootState,
	unknown,
	AuthActions | CommonActions
>;

export function register(email: string, password: string): ThunkType {
	return async dispatch => {
		dispatch(setLoadingStatus(LoadingStatus.LOADING));
		try {
			await authApi.register(email, password);
			dispatch(
				showAlert({
					text: 'Пользователь создан! Выполните вход',
					delay: 3000,
					type: 'success',
				})
			);
			dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
		} catch (e) {
			console.log(e);
			dispatch(showAlert({ text: e.response.data.message, delay: 3000, type: 'error' }));
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function login(email: string, password: string): ThunkType {
	return async dispatch => {
		dispatch(setLoadingStatus(LoadingStatus.LOADING));
		try {
			const { data } = await authApi.login(email, password);
			const maxAge = 3600 * 24 * 30;
			document.cookie = `jwtToken=${data.token}; max-age=${maxAge}`;
			document.cookie = `userId=${data.userId}; max-age=${maxAge}`;
			dispatch(setAuthData(data));
			dispatch(setLoadingStatus(LoadingStatus.SUCCESS));
		} catch (e) {
			console.log(e);
			dispatch(showAlert({ text: e.response.data.message, delay: 3000, type: 'error' }));
			dispatch(setLoadingStatus(LoadingStatus.ERROR));
		}
	};
}

export function autoLogin(): ThunkType {
	return async dispatch => {
		const { token, userId } = getAuthData();
		if (token && userId) {
			const authData: AuthDataInterface = {
				token,
				userId,
			};
			dispatch(setAuthData(authData));
		} else {
			dispatch(logout());
		}
	};
}

export function logout(): ThunkType {
	return async dispatch => {
		document.cookie = `jwtToken=''; max-age=-1`;
		document.cookie = `userId=''; max-age=-1`;
		dispatch(setLogout());
	};
}
