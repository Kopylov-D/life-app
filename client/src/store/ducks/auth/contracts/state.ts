import { LoadingStatus } from '../../../types';

export interface AuthState {
	isAuth: boolean;
	loadingStatus: LoadingStatus;
	authData: AuthDataInterface;
}

export interface AuthDataInterface {
	message?: string;
	token?: string | null;
	userId?: string;
}
