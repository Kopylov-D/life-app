import { Middleware } from 'redux';
import { setLogout } from '../ducks/auth/actionCreators';

export const redirectMiddleware: Middleware = store => next => action => {
	if (action.type === 'REDIRECT') {
		store.dispatch(setLogout());
	}

	return next(action);
};
