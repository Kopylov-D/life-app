import { LoadingStatus } from '../../types';
import {
	AuthActionTypes,
  AuthLogoutActionInterface,
	SetAuthDataActionInterface,
	SetLoadingStatusActionInterface,
} from './contracts/actionTypes';
import { AuthDataInterface } from './contracts/state';

export type AuthActions = SetLoadingStatusActionInterface | SetAuthDataActionInterface | AuthLogoutActionInterface;

export const setLoadingStatus = (
	payload: LoadingStatus
): SetLoadingStatusActionInterface => ({
	type: AuthActionTypes.SET_LOADING_STATUS,
	payload,
});

export const setAuthData = (payload: AuthDataInterface): SetAuthDataActionInterface => ({
	type: AuthActionTypes.SET_AUTH_DATA,
	payload,
})

export const setLogout = (): AuthLogoutActionInterface => ({
	type: AuthActionTypes.AUTH_LOGOUT,
});


