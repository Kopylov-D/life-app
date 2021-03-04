import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { AuthDataInterface } from './state';

export enum AuthActionTypes {
	SET_LOADING_STATUS = 'SET_LOADING_STATUS',
	SET_AUTH_DATA = 'SET_AUTH_DATA',
	AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export interface SetLoadingStatusActionInterface extends Action<AuthActionTypes> {
	type: AuthActionTypes.SET_LOADING_STATUS;
	payload: LoadingStatus;
}

export interface SetAuthDataActionInterface extends Action<AuthActionTypes> {
	type: AuthActionTypes.SET_AUTH_DATA;
	payload: AuthDataInterface;
}

export interface AuthLogoutActionInterface extends Action<AuthActionTypes> {
	type: AuthActionTypes.AUTH_LOGOUT;
}
