import { api, getAuthData } from '../../../services/api';
import { AuthData } from '../../../types';
import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_LOGOUT,
	AUTH_MESSAGE,
} from './actionTypes';

export function register(email: string, password: string) {
	return async (dispatch: any) => {
		dispatch(authStart());
		try {
			const { data } = await api.register(email, password);
			dispatch(authMessage(data.message));
		} catch (e) {
			console.log(e);
			dispatch(authMessage(e.message));
		}
	};
}

export function login(email: string, password: string) {
	return async (dispatch: any) => {
		dispatch(authStart());
		try {
			const { data } = await api.login(email, password);
			document.cookie = `jwtToken=${data.token}; max-age=360000`;
			document.cookie = `userId=${data.userId}; max-age=360000`;
			dispatch(authSuccess(data));
		} catch (e) {
			dispatch(authMessage(e.message));
			console.log(e);
		}
	};
}

export function autoLogin() {
	return async (dispatch: any) => {
		const { token, userId } = getAuthData();

		if (token && userId) {
			const authData: AuthData = {
				token,
				userId,
			};
			dispatch(authSuccess(authData));
		} else {
			dispatch(logout());
		}
	};
}

export function logout() {
	document.cookie = `jwtToken=; max-age=-1`;
	document.cookie = `userId=; max-age=-1`;
	return {
		type: AUTH_LOGOUT,
	};
}

type AuthStartType = {
	type: typeof AUTH_START;
};

type AuthSuccessType = {
	type: typeof AUTH_SUCCESS;
	authData: AuthDataType;
};

type AuthMessageType = {
	type: typeof AUTH_MESSAGE;
	message: string;
};

type AuthDataType = {
	message?: string;
	token?: string | null;
	userId?: string;
};

export function authStart(): AuthStartType {
	return {
		type: AUTH_START,
	};
}

export function authSuccess(authData: AuthDataType): AuthSuccessType {
	return {
		type: AUTH_SUCCESS,
		authData,
	};
}

export function authMessage(message: string): AuthMessageType {
	return {
		type: AUTH_MESSAGE,
		message,
	};
}
