import { LoadingStatus } from '../../types';
import { AuthActions } from './actionCreators';
import { AuthActionTypes } from './contracts/actionTypes';
import { AuthState } from './contracts/state';

const initialState: AuthState = {
	isAuth: false,
	loadingStatus: LoadingStatus.LOADED,
	authData: {},
};

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
	switch (action.type) {
		case AuthActionTypes.SET_AUTH_DATA:
			return {
				...state,
				isAuth: true,
				authData: action.payload,
			};
		case AuthActionTypes.SET_LOADING_STATUS:
			return {
				...state,
				loadingStatus: action.payload,
			};
		case AuthActionTypes.AUTH_LOGOUT:
			return {
				...state,
				isAuth: false,
				authData: {},
			};
		default:
			return state;
	}
};
