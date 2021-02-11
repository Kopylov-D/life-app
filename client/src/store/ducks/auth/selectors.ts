import { RootState } from '../../rootReducer';
import { LoadingStatus } from '../../types';

export const selectLoadingStatus = (state: RootState): LoadingStatus =>
	state.auth.loadingStatus;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
